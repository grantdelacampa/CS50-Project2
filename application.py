"""
*
* Grant De La Campa
* 2020
* project 2
* application.py:
*
"""

import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

rooms = ["Main Room"]
users = []

# define a user
# users always begin in the main room
def user(name):
    return {"name": name, "room": "Main Room"}


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("init")
def init(data):
    # NOTE: this is not a perfect fix since the application will not be live 
    #       I have opted to not properly fix this bug. As it stands users are identified
    #       by their username which caused multiple instances of the same user if a page was refreshed
    #       this fix assumes that two users will not login with the same name
    #       a proper fix would be to give each user a unique identifier and to not allow for multiple of the 
    #       same usernames.
    if user(data["user"]) not in users:
        users.append(user(data["user"]))
    for item in rooms:
        emit("addRoom", {'name': item})
    join_room("Main Room")
    emit("changeRoom", {"name": "Main Room"})
    emit("notify_room", {"name": data["user"]}, room="main_Room")

@socketio.on("add_room")
def add(data):
    print("new room")
    if data["name"] in rooms:
        return
    rooms.append(data["name"])
    emit("addRoom", data, broadcast=True)

@socketio.on("change_room")
def change(data):
    print("changing room")
    for item in users:
        print(" -checking: ", item['name'], " ,Room: ", item['room'])
        if item["name"] == data["user"] and item["room"] != data["name"]:
            leave_room(item["room"])
            item["room"] = data["name"]
            join_room(data["name"])
            emit("changeRoom", {"name": data["name"]})
            emit("notify_room", {"name": item["name"]},  room = item["room"])

@socketio.on("update")
def change_n(data):
    print("updating name")
    for item in users:
        print(" -checking: ", item['name'], " ,Room: ", item['room'])
        # find the user who wants to change their name 
        if(item["name"] == data["old"]):
            # update server user list
            item["name"] = data["name"]
            print(users)
            # change the users name locally
            emit("update_name", {"name": data["name"]})
            emit("notify_user", data, room = item["room"])
    
@socketio.on("send")
def send_message(data):
    message = data["text"]
    user = data["user_name"]
    print("Sending message from ", user, " to room ", data["name"]);
    emit("addMessage", {"name": user, "message": message}, room = data["name"])

if __name__ == '__main__':
    socketio.run(app, host = '0.0.0.0')
