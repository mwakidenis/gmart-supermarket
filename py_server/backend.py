from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for development purposes

# Replace the connection string with your MongoDB Atlas connection string
mongo_uri = "mongodb+srv://mkkaria04:minavkaria@cluster0.gbnnstq.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["users"]
collection = db["login_data"]


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    login_data = {'username': username, 'password': password}
    result = collection.insert_one(login_data)

    response = {'message': 'Login data saved successfully!', 'inserted_id': str(result.inserted_id)}
    return jsonify(response)

@app.route('/trail', methods=['GET'])
def trail():
    return "Hello World!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    login_data = collection.find_one({'username': username, 'password': password})

    if login_data:
        response = {'message': 'Login successful!'}
    else:
        response = {'message': 'Invalid login credentials!'}

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
