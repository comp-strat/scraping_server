import os.path

from server.crawler.output import get_zip
from .utils import token_required
from server.crawler.tracking import job_repository
from server.jobs.actions import validate_job_id

from flask import Blueprint, send_file

bp = Blueprint("job_download", __name__, url_prefix="/api/jobs")


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
    return response


@bp.route("/<job_id>/download", methods=["GET"])
def download_job_result(job_id):
    status = job_repository.get_status(job_id)
    zip_path = get_zip(job_id)
    response = send_file(zip_path, as_attachment=True)
    response.headers["Content-Type"] = "application/zip"
    filename = os.path.basename(zip_path)
    response.headers["Content-Disposition"] = \
        f"attachment; filename=\"{filename}\""
    return response
