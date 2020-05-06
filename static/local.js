/*
* Grant De La Campa
* 2020
* Project2: local.js
*/
/*----------------------------------------------------------------------------------------------------
			Start up functions
----------------------------------------------------------------------------------------------------*/
//	NOTE: Functions located here in the footer do not require a server connection.
			//var message = document.getElementById('text-field');
			//var new_room = document.getElementById('dialog-input');
			//var send = document.getElementById('input-button');
			//var create_room = document.getElementById('create-button');
			//var messages = document.getElementById('middle-col');
			//var user = document.getElementById('nav-user');
			
			/* Checks if localstorage is set on startup*/
			if(!localStorage.getItem('username')){
				document.getElementById('user-dialog').show();
			} else {
				document.getElementById('nav-user').innerHTML = localStorage.getItem('username');
			}
			
			/* listen for the username to be clicked */
			document.getElementById('nav-user').addEventListener("click", function () {
				document.getElementById('dialog-prompt').innerHTML = ('Select a new username or press confirm to go back');
				document.getElementById('dialog-input').value = localStorage.getItem('username');
				document.getElementById('dialog-input').focus();
				document.getElementById('user-dialog').show();
			});

/*----------------------------------------------------------------------------------------------------
			Room listeners and functions
----------------------------------------------------------------------------------------------------*/

			// Listens for the user to click the add room icon.
			document.getElementById('add-icon').addEventListener("click", function() {
				var icon = document.getElementById('new-room');
				if(icon.style.display === "none"){
					icon.style.display = "block";
					document.getElementById('room-input').focus();
				} else {
					icon.style.display = "none";
					document.getElementById('room-input').value = "";
				}
			});
			
			// update the users name on the nav bar
			function update_name(name){
				localStorage.setItem('username', name);
				document.getElementById('nav-user').innerHTML = name;
				document.getElementById('dialog-input').value = "";
				document.getElementById('user-dialog').close();
			}
			
			// force the div to scroll to the bottom
			function scrollBottom(){
				let mCol = document.getElementById('column-middle');
				let h = document.getElementById('middle-col').offsetHeight;
				mCol.scrollTop = h;
			}
			
			// create a message
			function create_message(name, body) {
				let div = document.createElement('div');
					if(name == localStorage.getItem('username')){
						div.className = 'container';
					} else {
						div.className = 'container darker';
					}
				let label = document.createElement('label');
					label.alt = 'username';
					label.innerHTML = name;
					div.appendChild(label);
				let message = document.createElement('p');
					message.innerHTML = body
					div.appendChild(message);
				let span = document.createElement('span');
					span.className = 'time-right';
					span.innerHTML = timeStamp();
					div.appendChild(span);
				document.getElementById('middle-col').appendChild(div);
			}
			
			// Creates a chat notification
			function notify(body){
				let div = document.createElement('div');
					div.className = 'container-notice';
				let text = document.createElement('p');
					text.innerHTML = body;
					div.appendChild(text);
					document.getElementById('middle-col').appendChild(div);
			}

/*----------------------------------------------------------------------------------------------------
			text input functions
----------------------------------------------------------------------------------------------------*/

			// Function: when the user presses enter in the message input field press the button associated with that field.
			document.getElementById('text-field').addEventListener("keyup", function(event){
				if(event.key === "Enter"){
					document.getElementById('input-button').click();
				}
			});
			
			// Function: when the users press enter in the room input field press the button associated with that field.
			document.getElementById('room-input').addEventListener("keyup", function(event){
				if(event.key === "Enter"){
					document.getElementById('create-button').click();
				}
			});

/*----------------------------------------------------------------------------------------------------
			Misc functions for look and feel
----------------------------------------------------------------------------------------------------*/
			
			// Function: Generate the local time is HH:MM(pm/am) format
			function timeStamp(){
				let today = new Date();
				return (today.getHours() % 12) + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + (today.getHours % 12 > 0 ? "am" : "pm");
			}
			
			//Function: Resizes page components when the page is resized
			window.addEventListener('resize', resize());
			window.addEventListener('load', resize());
			function resize() {
				var w = window.innerWidth;
				var h = window.innerHeight;
				var page_header_height = document.getElementById('nav').offsetHeight;
				var room_header_height = document.getElementById('room-name').offsetHeight;
				var adjusted_height = h - page_header_height - room_header_height;
				if ( w > 600) {
					adjusted_height += 'px';
					document.getElementById('column-middle').style.minHeight = adjusted_height;
					document.getElementById('column-side').style.minHeight = adjusted_height;
				} else {
					adjusted_height -= room_header_height;
					adjusted_height += 'px';
					document.getElementById('column-middle').style.minHeight = adjusted_height;
				}
			}
			
			// Function: Overrides CSS variables to re-theme the page
			function setDarkMode(){
				document.documentElement.style.setProperty('--main-bg-color', 'black');
				document.documentElement.style.setProperty('--secondary-bg-color', '#3a3f54');
				document.documentElement.style.setProperty('--accent-bg-color', 'blue');
				document.documentElement.style.setProperty('--text-color', 'white');
				document.documentElement.style.setProperty('--border-color', 'darkgrey');
				document.documentElement.style.setProperty('--local-message', '#424bf5');
				document.documentElement.style.setProperty('--server-message', 'green');
			}
			

			// Function: Overrides CSS variables to re-theme the page
			function setLightMode(){
				document.documentElement.style.setProperty('--main-bg-color', 'white');
				document.documentElement.style.setProperty('--secondary-bg-color', 'lightgrey');
				document.documentElement.style.setProperty('--accent-bg-color', 'blue');
				document.documentElement.style.setProperty('--text-color', 'black');
				document.documentElement.style.setProperty('--border-color', 'black');
				document.documentElement.style.setProperty('--local-message', 'skyblue');
				document.documentElement.style.setProperty('--server-message', 'lightgreen');
			}
			