	/*--------------------------------------------------------------------------------------------
			Initial setup
	--------------------------------------------------------------------------------------------*/
			// This will check localstorage for a key
			if(localStorage.getItem('username')){
				let us = localStorage.getItem('username'); 
				document.getElementById('user').innerHTML = us;
			}else{
				console.log("username is NOT set");
			}
	/*--------------------------------------------------------------------------------------------
			Give elements their event listeners
	--------------------------------------------------------------------------------------------*/

			document.getElementById("send").addEventListener("click", postMessage);

	/*--------------------------------------------------------------------------------------------
			Handle the message button being pressed
	--------------------------------------------------------------------------------------------*/
			// For submitting messages to others
			function postMessage(){
				let message = document.getElementById("message-input").value;
				if(message.length > 0){
					const li = document.createElement('li');
					li.innerHTML = message;
					li.id = "user-message";
					document.getElementById('chat-list').append(li);
					document.getElementById('message-input').value = '';
				//document.getElementById('send').disabled = true;
				} else {
					console.log("message had no body");
				}
			}
			
			// code to push chat to server
			// code to ask server for users in the rooms
			// code to ask server for chats