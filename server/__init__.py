import os

from flask import Flask, request, send_file, session, jsonify
from server.settings import *


def create_app(test_config=None):
    app = Flask(__name__)

    validate_server_settings()

    if test_config is not None:
        app.config.from_mapping(test_config)
    
    from .home import views as home_views
    app.register_blueprint(home_views.bp)
    from .interfaces import views as interface_views
    app.register_blueprint(interface_views.bp)

    @app.after_request
    def after_request(response):
        header = response.headers
        header["Access-Control-Allow-Credentials"] = True
        header["Access-Control-Allow-Origin"] = settings.CLIENT_ORIGIN
        header["Access-Control-Allow-Headers"] = "*"
        header["Access-Control-Allow-Methods"] = "*"
        header["Content-Type"] = "text/json"
        return response

    return app


def validate_server_settings():
    assert (GOOGLE_OAUTH_CLIENT_URL is not None, "Missing Google oauth client ID")
    assert (FLASK_ENV != "production" or not DEBUG_NO_AUTH_ENABLED,
            "No auth mode mustn't be enabled for production environment")
    if DEBUG_NO_AUTH_ENABLED:
        print(" * No authentication mode enabled")
