from functools import wraps
from flask import render_template, Blueprint, request, jsonify
from server import settings
from google.oauth2 import id_token
from google.auth.transport import requests
bp = Blueprint("interfaces", __name__, url_prefix="")

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[-1].strip()

        if token is None:
            return jsonify({
                "status": 401,
                "message": "Authentication Failed: Missing Token"
            }), 401

        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), settings.GOOGLE_OAUTH_CLIENT_URL
            )
            return f(idinfo["email"], *args, **kwargs)
        except ValueError:
            return jsonify({
                "status": 401,
                "message": "Authentication Failed: Invalid Token"
            }), 401

    return decorator


