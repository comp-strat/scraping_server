import os

from flask import Flask, request, send_file, session, jsonify
import settings

def create_app(test_config=None):
    app = Flask(__name__)
    
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
