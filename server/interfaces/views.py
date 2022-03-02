import json
from functools import wraps

import rq, os, redis
from flask import render_template, Blueprint, request, jsonify
from server import settings
from server.crawler.run_spider import scrapy_execute
from google.oauth2 import id_token
from google.auth.transport import requests
from uuid import uuid4
from server.settings import *


bp = Blueprint("interfaces", __name__, url_prefix="")

queue = rq.Queue("crawling-tasks", default_timeout=3600,
                 connection=redis.Redis.from_url('redis://'))


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if DEBUG_NO_AUTH_ENABLED:
            return f("DEBUG_NO_AUTH_ENABLED", *args, **kwargs)
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[-1].strip()

        if token is None:
            return jsonify(
                message="Authentication Failed: Missing Token"
            ), 401

        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), settings.GOOGLE_OAUTH_CLIENT_URL
            )
            return f(idinfo["email"], *args, **kwargs)
        except ValueError:
            return jsonify(
                message="Authentication Failed: Invalid Token"
            ), 401

    return decorator


@bp.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] = True
    header["Access-Control-Allow-Origin"] = settings.CLIENT_ORIGIN
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    header["Content-Type"] = "text/json"
    return response


@bp.route("/jobs/create", methods=["POST"])
@token_required
def create_task(user):
    data = json.loads(request.data.decode("utf-8"))
    if "urls" not in data:
        return jsonify(
            message="No URL in the request payload"
        ), 400

    # queue = rq.Queue("crawling-tasks", default_timeout=3600,
    #                  connection=Redis.from_url('redis://'))

    urls = data["urls"]
    title = data["title"] if "title" in data else None
    job_id = str(uuid4())

    queue.enqueue(scrapy_execute, urls, user, title, job_id)

    return jsonify(
        jobID=job_id,
    ), 200

