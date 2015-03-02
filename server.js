var net = require('net');
var botname = 'teqbot: ';
http = require("http");

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
	switch(msg.toString()){
		case 'weather':
			getWeather('Raleigh,NC,USA', callback);
			break;
		default: callback('You said nothing of consequence, so I am ignoring you.');
	}
}

function getWeather(city, callback){
	// weather.getCurrent('Cary,NC,USA', function(current){
	// 	console.log(current.temperature());
	// 	callback(botname+'Current temperature is '+current.temperature());
	// });
	return http.get("http://api.openweathermap.org/data/2.5/weather?q=" + (encodeURIComponent(city)), function(response) {
		response.setEncoding('utf8');
		var responseData = '';
		response.on('data', function(chunk){
			console.log(chunk);
			responseData += chunk;
		});
		response.on('error', function(error){
			error.forEach(function(e){
				console.log(e);
			});
		});
		response.on('end', function(){
			var jsonData = JSON.parse(responseData);
			return callback('The current temperature is ' + jsonData.main.temp);
		});	
	});
}

var server = net.createServer(function(socket){
	socket.on('error', function(error){
		console.log('Empty request received.');

	});
	socket.on('data', function(data){
		console.log('Received message: '+data + ' from '+socket.remoteAddress);
		//var response = processMessage(data);
		var time = createTimeString();
		processMessage(data, function(response){
			socket.write(response + ', at time: ' + time);
		});
		
	});
	
});
var port = 1337;
var host = '127.0.0.1';
server.listen(port,host);

console.log('Server listening on '+ host+':'+port);

