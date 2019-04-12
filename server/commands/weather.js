var http = require("http");
var fs = require('fs');
var apiKeyFile = './secrets/openweatherkey.json';
var openWeatherCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

var apiKey = '';

fs.readFile(apiKeyFile, 'utf8', function(err, data) {
	if (err) {
		throw err;
	}
	apiKey = JSON.parse(data).apiKey;
});



function convertKelvinToCelsius(kelvin){
	return kelvin - 273.15;
}

function convertKelvinToFahrenheit(kelvin){
	var celsius = convertKelvinToCelsius(kelvin);
	return Math.round((celsius * 1.8) + 32);
}

function getWeatherByCity(city, callback){
	return http.get(openWeatherCurrentUrl + encodeURIComponent(city) + '&APPID=' + apiKey, function(response) {
		response.setEncoding('utf8');
		var responseData = '';
		response.on('data', function(chunk){
			responseData += chunk;
		});
		response.on('error', function(error){
			error.forEach(function(e){
				console.log(e);
			});
			return callback('There was an error retrieving weather data: ' + error);
		});
		response.on('end', function(){

			var jsonData = JSON.parse(responseData);
			console.log(`response from api: ${responseData}`);
			try{
				var temp =  convertKelvinToFahrenheit(jsonData.main.temp);
				var condition = jsonData.weather[0].main;
				return callback('In '+ city + ', the current conditions are ' + temp + ' degrees and '+ condition);
			}catch(e){
				console.log('Error retrieving weather for ' + city + ': '+e);
				return callback('Sorry, no weather information was found for '+ city);
				
			}
			
		});	
	});
}

module.exports = {
	getWeatherByCity: getWeatherByCity
};

