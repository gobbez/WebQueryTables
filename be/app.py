from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS
from pathlib import Path

import load_db
import login_user
import createtable
import selecttable

# Path
THIS_FOLDER = Path(__file__).parent.resolve()


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome!"


@app.route('/login_user', methods=['POST'])
def loginuser_route():
    data = request.get_json()

    if not data or "username" not in data or "password" not in data:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    username = data["username"]
    password = data["password"]

    result = login_user.loginuser(username, password)

    return jsonify(result)

@app.route('/register_user', methods=['POST'])
def registeruser_route():
    data = request.get_json()

    if not data or "registerUsername" not in data or "registerPassword" not in data:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    username = data["registerUsername"]
    password = data["registerPassword"]

    result = login_user.registeruser(username, password)

    return jsonify(result)



@app.route('/create_table', methods=['GET', 'POST'])
def create_table():
    data = request.get_json()
    result = createtable.create_table(data)
    return jsonify(result), 200 if result["status"] == "success" else 400

@app.route('/create_row', methods=['GET', 'POST'])
def create_row():
    data = request.get_json()
    result = createtable.create_row(data)
    return jsonify(result), 200 if result["status"] == "success" else 400


@app.route('/select_all', methods=['GET', 'POST'])
def select_all():
    return jsonify(selecttable.select_all_tables())

@app.route('/select_yours', methods=['GET', 'POST'])
def select_yours():
    data = request.get_json()
    result = selecttable.select_your_tables(data)
    return jsonify(result)

@app.route('/select_all_from_table', methods=['GET', 'POST'])
def select_from():
    data = request.get_json()
    result = selecttable.select_all_from_table(data)
    return jsonify(result)


@app.route('/get_columns', methods=['GET', 'POST'])
def get_columns():
    table = request.get_json()
    result = selecttable.get_columns(table)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
