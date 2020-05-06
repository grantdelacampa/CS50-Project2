/*
* Grant De La Campa
* 2020
* Project2: server.js
*/
document.addEventListener('DOMContentLoaded', () => {
    var socket = io({transports: ['websocket'], upgrade: false});
	
	// event fires when socket connects
	socket.on('connect', () => {
	
		// set up the server and tell it what user has connected
		socket.emit('init', {'user': localStorage.getItem('username')});
	});
		

/*------------------------------------------- ROOM FUNCTIONS------------------------------------------------------------------------*/

/*Send a newly created room to the server*/
	document.getElementById('create-button').addEventListener("click", function() {
		var text = document.getElementById('room-input');
		if(text.value.length>0) {
			socket.emit('add_room', {'name': text.value});
		}
	});
	
/*Process a new room from the server */
	socket.on('addRoom', data => {
		let div = document.createElement('div');
			div.className = 'room-container';
			// Listen for a room to be clicked and notify the server of the room change
			div.addEventListener("click", function() {
				socket.emit('change_room', {"name": data.name, "user": localStorage.getItem('username')});
			});
		let p = document.createElement('p');
			p.innerHTML = data.name;
		div.appendChild(p)
		document.getElementById('column-side').appendChild(div);
		document.getElementById('room-input').value = "";
		document.getElementById('new-room').style.display = "none";
	});
	
/*Process a room change */
	socket.on('changeRoom', data => {
		let new_room = data['name'];
		// set the room name header to the room name
		document.getElementById('room-name').innerText = new_room;
		// store the room elements
		let rooms = document.getElementsByClassName('room-container');
		// iterate on the room elements starting at 1 since 0 is a special element
		for(var i = 1; i<rooms.length; i++){
			// the first element of every room is always the <p> containing the room name
			let name = rooms[i].querySelectorAll('p')[0].innerHTML;
			// strip the id from every element that doesnt match since we are already iterating on the full list
			rooms[i].removeAttribute('id');
			if(new_room == name){
					// disable the current rooms div
					rooms[i].id = 'disable';
			}
		}
		// tidy up the interface by removing all of the current messages
		let mCol = document.getElementById('middle-col');
		mCol.innerHTML = '';
	});
	
	/* process room notifications from the server */
	socket.on('notify_room', data => {
		notify(data['name'] +  " has entered the room");
	});
	
/*------------------------------------------- Message FUNCTIONS------------------------------------------------------------------------*/

/*Send a user message to ther server */
	document.getElementById('input-button').addEventListener("click", function() {
		var field = document.getElementById('text-field');
		var room_name = document.getElementById('room-name').innerText;
		var user = document.getElementById('nav-user').innerHTML;
		if(field.value.length > 0){
			socket.emit("send", {"text": field.value, "name": room_name, "user_name":user});
			//create_message("test", field.value);
			// reset the text-field after input and give it focus 
			field.value = "";
			field.focus();
		}
	});
/* receive a message from the server */
	socket.on("addMessage", data=> {
		create_message(data.name, data.message);
		scrollBottom();
	});

/*------------------------------------------- Name FUNCTIONS------------------------------------------------------------------------*/

	document.getElementById('confirmBtn').addEventListener("click", function() {
		var input = document.getElementById('dialog-input');
		var name = document.getElementById('nav-user').innerHTML;
		if (input.value.length > 0){
			socket.emit("update", {"name": input.value, "old": name});
		}
	});
	
	socket.on("update_name", data => {
		update_name(data.name);
	});

/* process name notifications from the server */
	socket.on('notify_user', data => {
		notify(data['old'] + " has changed their name to " + data['name']);
	});

/*process events from the server*/

	// prevents double socket connection somehow
	socket.on('disconnect', function () {
        socket.removeAllListeners('send message');
        socket.removeAllListeners('disconnect');
        io.removeAllListeners('connection');
    });
});