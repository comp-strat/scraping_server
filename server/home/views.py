from flask import render_template, Blueprint
bp = Blueprint("home", __name__, url_prefix="")


@bp.route("/", methods=("GET",))
def home():
    return "<h1>Hello</h1>"
    # return render_template("home.html")
