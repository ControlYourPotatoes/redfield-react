from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data to simulate a database
database = {
    1: {"name": "Alice", "age": 25},
    2: {"name": "Bob", "age": 30},
    3: {"name": "Charlie", "age": 35}
}

# Routes

# Endpoint to get all users
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(database)

# Endpoint to get a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    if user_id in database:
        return jsonify(database[user_id])
    else:
        return jsonify({"error": "User not found"}), 404

# Endpoint to create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if data is None or "name" not in data or "age" not in data:
        return jsonify({"error": "Invalid data"}), 400
    new_user_id = max(database.keys()) + 1
    database[new_user_id] = {"name": data["name"], "age": data["age"]}
    return jsonify({"message": "User created successfully", "user_id": new_user_id}), 201

# Endpoint to update an existing user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    if user_id in database:
        data = request.get_json()
        if data is None or "name" not in data or "age" not in data:
            return jsonify({"error": "Invalid data"}), 400
        database[user_id]["name"] = data["name"]
        database[user_id]["age"] = data["age"]
        return jsonify({"message": "User updated successfully", "user_id": user_id})
    else:
        return jsonify({"error": "User not found"}), 404

# Endpoint to delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_id in database:
        del database[user_id]
        return jsonify({"message": "User deleted successfully", "user_id": user_id})
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)