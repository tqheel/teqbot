var net = require('net');

var client = new net.Socket();
var host = '127.0.0.1';
var port = 1337;

module.exports = {
	send: send
};

function send(command){
	client.connect(port, host, function(){
	if(!command){
		client.write('nuthin');
	}
	else{
		client.write(command);
	}	
	});
	client.on('data', function(data){
		console.log(data.toString());
		client.destroy();
	});
	client.on('close', function() {
	    //console.log('Connection closed');
	});
}
