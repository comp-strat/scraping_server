import os

from flask import Flask, request, send_file, session, jsonify


def create_app(test_config=None):
    app = Flask(__name__)
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)
        
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from .home import views as home_views
    app.register_blueprint(home_views.bp)
    
    return app
