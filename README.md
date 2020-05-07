<h1>Project 2</h1>

Web Programming with Python and JavaScript

<h2>Project Overview</h2>

This is a flask based chat room application created to practice web development using javascript. 
It uses localStorage to hold the username of a user and register them into the server. 
By default the user is asked to enter a username when first loading the webpage.
Afterwards the user is able to change their name by clicking on it to display a prompt.
A username change will alert all users in the same room to the change. 
The application allows for the creating of rooms for all users and allows users to join those rooms. 
When a new room is created it shows for all users connected to the application. 
Users can then join a room to interact with other users in the same room.
When a user joins a room an alert is issued to that room that the user joined.

<h2>Technology used</h2>
<ul>
	<li>Python Flask server</li>
	<li>CSS for styling</li>
	<li>Favicons for the various icons used</li>
	<li>JavaScript for interactions between the HTML page and flask server</li>
</ul>

<h2>Project Structure</h2>
	<ul>
		<li>application.py</li>
		<li>/static
			<ul>
				<li>local.js</li>
				<li>server.js</li>
				<li>main.css</li>
			</ul>
		</li>
		<li>/templates
			<ul>
				<li>index.html</li>
			</ul>
		</li>
		<li>set.bat</li>
	</ul>
	<p><h3>application.py:</h3>This file acts as the server for the project it manages actions such as directing messages and keeping track of users.</p>
	<p><h3>index.html:</h3>The only interface for the project, it's divided into two columns one for server rooms and another for messages.</p>
	<p><h3>server.js:</h3>Handles all code relating to the server any time data is sent to or received from application.py a function in this file is used.</p>
	<p><h3>local.js:</h3>Handles local changes such as setting or getting the localStorage value, creating elements like divs and other functions such as themeing.</p>
	<p><h3>main.css:</h3>Contains all CSS styling for index.HTML.</p>