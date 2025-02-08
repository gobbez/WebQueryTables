from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_cors import CORS
from pathlib import Path

import load_db
import loginpassword
import createtable

# Path
THIS_FOLDER = Path(__file__).parent.resolve()


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify(load_db.show_tables())

@app.route('/login_password', methods=['GET', 'POST'])
def login_password():
    data = request.get_json()
    if not data or "password" not in data:
        return jsonify({"error": "Password is required"}), 400

    user_password = data["password"]
    is_valid = loginpassword.loginpassword(user_password)

    return jsonify(is_valid)

@app.route('/create_table', methods=['GET', 'POST'])
def create_table():
    data = request.get_json()
    result = createtable.create_table(data)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
