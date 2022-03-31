import json
from functools import wraps
from flask import Blueprint, request, jsonify
from server.crawler.tracking import job_repository, CrawlJobStatus
from utils import token_required

bp = Blueprint("job_actions", __name__, url_prefix="/jobs")


def validate_job_id(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        job_id = kwargs["job_id"]
        if job_id is None or not task_exist(job_id):
            return jsonify(
                message=f"{job_id} does not exist"
            )
        else:
            return f(*args, **kwargs)

    def task_exist(job_id) -> bool:
        return job_repository.get_job(job_id) is not None

    return decorator


@bp.before_request
@token_required
@validate_job_id
def before_request():
    """Validate user and job_id at all action endpoints."""
    pass


@bp.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] = True
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    header["Content-Type"] = "text/json"
    return response


@bp.route("/<job_id>", methods=["GET"])
def get_job(user, job_id):
    return jsonify(
        job_repository.get_job(job_id).to_dict()
    ), 200


@bp.route("/<job_id>/status", methods=["GET"])
def job_status(user, job_id):
    status = job_repository.get_status(job_id)
    return jsonify(
        status=status.value
    ), 200


@bp.route("/<job_id>/cancel", methods=["GET"])
def job_cancel(user, job_id):
    status = job_repository.get_status(job_id)
    if status is CrawlJobStatus.ongoing:
        job_repository.kill_job(job_id)
        return jsonify(
            message=f"{job_id} cancelled"
        ), 200
    else:
        return jsonify(
            message=f"{job_id} is not an active job: status={status.value}"
        ), 405


@bp.route("/<job_id>/result", methods=["GET"])
def job_result(user, job_id):
    status = job_repository.get_status(job_id)
    # TODO: Serialize and send results
