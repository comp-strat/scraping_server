from flask import render_template, Blueprint
bp = Blueprint("home", __name__, url_prefix="")


@bp.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] = True
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"
    header["Content-Type"] = "text/html"
    return response


@bp.route("/", methods=("GET",))
@bp.route("/jobs", methods=("GET",))
def home():
    return render_template("home.html")