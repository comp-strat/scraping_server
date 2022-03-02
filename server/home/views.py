from crypt import methods
from flask import render_template, Blueprint
bp = Blueprint("home", __name__, url_prefix="")


@bp.route("/", methods=("GET",))
def home():
    return render_template("home.html")
