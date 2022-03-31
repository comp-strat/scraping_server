import json

import rq, os, redis
from flask import render_template, Blueprint, request, jsonify
from server import settings
from server.crawler.run_spider import scrapy_execute
from utils import token_required
from server.crawler.tracking import job_repository, CrawlJobStatus

bp = Blueprint("job_interfaces", __name__, url_prefix="/jobs")
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
def all_jobs(user):
    job_repository.get_all_jobs(user)
    return jsonify()


@bp.route("/create", methods=["POST"])
def create_job(user):
    data = json.loads(request.data.decode("utf-8"))
    if "urls" not in data:
        return jsonify(
            message="No URL in the request payload"
        ), 400

    urls = data["urls"]
    title = data["title"] if "title" in data else None
    job_id = job_repository.new_job(urls, user, title)

    queue.enqueue(scrapy_execute, urls, user, title, job_id)

    return jsonify(
        jobID=job_id,
    ), 200
