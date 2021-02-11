from flask import Flask, request
import items_service

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home_route():
    return {
            "message": "Hello, World!"
            }


@app.route('/items/all', methods = ['GET'])
def get_all_items():
    return {
            "items": items_service.get_all_items()
            }


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
