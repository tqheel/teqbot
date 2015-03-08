var teqbot = require('./client/client.js');
var readline = require('readline');
var botName = 'teqbot';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(botName+": Enter command or press enter for a list of available commands")
rl.question("command> ", function(command) {
	getBotResponse(command);
});

function getBotResponse(command){
	teqbot.send(command);
	rl.close();
}