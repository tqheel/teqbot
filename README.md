# teqbot
Node.js client and server scripts for a Bot that can respond to basic commands such as "weather". 

These scripts are currently a working prototype, so the available commands are not that sophisticated. However, the bot can be easily extended 
by adding additional command scripts to the "commands" folder and then wiring up to the server command array.

To run locally, first run "npm install" from the root of the project. Then:
- Obtain an API key from [OpenWeatherMap.org](https://openweathermap.org/appid)
- Create a json file in ./secrets dir called openweatherkey.json
  -  Add as single property called "apiKey" with a value of the key provided to you
- Type "node server/server" from the root of the project
- Open a new terminal session
- Type "node teqbot" from the root of the project
- Enter a command as prompted

##Commands currently available as of 4/11/2019:
- hello
- goodbye
- weather (defaults to Cary, NC, USA, if no city argument is specified)
	- Use ">" as an argument separator to specify a specific city (e.g., "weather>Boston, MA")
	- Weather temperatures are in Fahrenheit

