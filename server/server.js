var net = require('net');
var weather = require('./commands/weather.js');

var botname = 'teqbot';

var port = 1337;
var host = 'localhost';

var commands = [
		'weather',
		'hello',
		'goodbye'
];

function createTimeString(){
	date = new Date();
	var y = date.getFullYear();
	var m = zeroPadIfNeeded(date.getMonth()+1);
	var d = zeroPadIfNeeded(date.getDate());
	var h = zeroPadIfNeeded(date.getHours());
	var min = zeroPadIfNeeded(date.getMinutes());
	var dash = '-';
	return y+dash+m+dash+d+' '+h+':'+min;
}
function zeroPadIfNeeded(input){
	return (input<10) ? '0' + input.toString() : input.toString();
}
function processMessage(msg, callback){
	var response = '';
	switch(msg.toString().toLowerCase()){
		case commands[0]:
			weather.getWeatherByCity('Cary, NC, USA', callback);
			break;
		case commands[1]:
			callback('Hi. How are you?');
			break;
		case commands[2]:
			callback('Leaving so soon? That makes ' + botname + ' so sad. :-(');
			break;
		default: 
			callback('You said nothing of consequence. Available commands are as follows: ' + commands);
	}
}




var server = net.createServer(function(socket){
	socket.on('error', function(error){
		console.log('Empty request received.');

	});
	socket.on('data', function(data){
		console.log('Received command: '+data + ' from '+socket.remoteAddress);
		var time = createTimeString();
		processMessage(data, function(response){
			socket.write(time + '\n' + botname + ': ' + response);
		});
		
	});
	
});
server.listen(port);

console.log('Server listening on '+ host+':'+port);

