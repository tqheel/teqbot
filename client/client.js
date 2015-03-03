var net = require('net');

var client = new net.Socket();
var host = '127.0.0.1';
var port = 1337;
var city = process.argv[3];


client.connect(port, host, function(){
	//console.log('Connected to: ' +host+':'+port);
	if(!process.argv[2]){
		client.write('nuthin');
	}
	else{
		client.write(process.argv[2]);
	}
	
});
client.on('data', function(data){
	console.log(data.toString());
	client.destroy();
});
client.on('close', function() {
    //console.log('Connection closed');
});