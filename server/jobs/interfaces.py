import json
import redis
import rq
from flask import Blueprint, request, jsonify, g
from server.crawler.run_spider import scrapy_execute
from server.crawler.tracking import job_repository
from .utils import token_required

bp = Blueprint("job_interfaces", __name__, url_prefix="/api/jobs")
queue = rq.Queue("crawling-tasks", default_timeout=3600,
                 connection=redis.Redis.from_url('redis://'))


@bp.before_request
@token_required
def before_request():
    """Validate user."""
    pass


@bp.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] = True
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    header["Content-Type"] = "text/json"
    return response


@bp.route("/", methods=["GET"])
def all_jobs():
    job_repository.update_stats(g.user)
    jobs_dict = job_repository.get_all_jobs(g.user)
    return jsonify(
        user=g.user,
        jobs=[
            {
               "job_id": job_id,
               **jobs_dict[job_id].to_dict()
            } for job_id in jobs_dict
        ]
    ), 200


@bp.route("/create", methods=["POST"])
def create_job():
    data = json.loads(request.data.decode("utf-8"))
    if "urls" not in data:
        return jsonify(
            message="No URL in the request payload"
        ), 400

    urls = data["urls"]
    title = data["title"] if "title" in data else None
    job_id = job_repository.new_job(urls, g.user, title)

    queue.enqueue(scrapy_execute, urls, g.user, title, job_id)

    return jsonify(
        job_id=job_id,
    ), 200
