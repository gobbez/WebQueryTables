from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS
from pathlib import Path

import load_db
import login_user
import createtable

# Path
THIS_FOLDER = Path(__file__).parent.resolve()


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify(createtable.select())


@app.route('/login_user', methods=['POST'])
def loginuser_route():
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    username = data["username"]
    password = data["password"]

    result = login_user.loginuser(username, password)

    return jsonify(result)

@app.route('/create_table', methods=['GET', 'POST'])
def create_table():
    data = request.get_json()
    result = createtable.create_table(data)
    return jsonify(result), 200 if result["status"] == "success" else 400

@app.route('/new_table', methods=['GET', 'POST'])
def new_table():
    data = request.get_json()
    result = createtable.create_table(data)
    return jsonify(result), 200 if result["status"] == "success" else 400

if __name__ == '__main__':
    app.run(debug=True)
