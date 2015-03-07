# teqbot
Node.js client and server scripts for a Bot that can respond to basic commands such as "weather". 

These scripts are currently a working prototype, so the available commands are not that sophisticated. However, the bot can be easily extended 
by adding additional command scripts to the "commands" folder and then wiring up to the server command
array.

To run locally, first run "npm install" from the root of the project. Then:
- Switch to the server directory
- Run "node server"
- Open a new terminal session
- Run "node teqbot"
- Enter a command as prompted

Commands currently available as of 3/6/2015:
- hello
- goodbye
- weather (currently returns current temp and conditions for Cary, NC, USA, but will soon accept an argument for a city)

