/*
* Grant De La Campa
* 2020
* Project2
*/

// wait until the entire document has loaded allowing access to all DOM elements
document.addEventListener('DOMContentLoaded', () => {
	
	// By default, submit button is disabled
	document.getElementById('submit').disabled = true;
					
	// When text is entered enable the submit button
	document.getElementById('name').onkeyup = () =>{
	// if the input with id = name has a value  
	if (document.getElementById('name').value.length > 0)
		// then enable the submit button
		document.getElementById('submit').disabled = false;
	else
		// leave the button disabled
		document.getElementById('submit').disabled = true;
	};
		
	//get the user form submission event
	document.getElementById('user-form').onsubmit = () => {
		// store the username locally
		localStorage.setItem('username', document.getElementById('name').value);
		// request the home page
        const request = new XMLHttpRequest();
		request.open('POST', '/home');
	};
});