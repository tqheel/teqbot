var http = require("http");
var openWeatherCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=";


function convertKelvinToCelsius(kelvin){
	return kelvin - 273.15;
}

function convertKelvinToFahrenheit(kelvin){
	var celsius = convertKelvinToCelsius(kelvin);
	return Math.round((celsius * 1.8) + 32);
}

function getWeatherByCity(city, callback){
	return http.get(openWeatherCurrentUrl + encodeURIComponent(city), function(response) {
		response.setEncoding('utf8');
		var responseData = '';
		response.on('data', function(chunk){
			responseData += chunk;
		});
		response.on('error', function(error){
			error.forEach(function(e){
				console.log(e);
			});
		});
		response.on('end', function(){
			var jsonData = JSON.parse(responseData);
			var temp =  convertKelvinToFahrenheit(jsonData.main.temp);
			var condition = jsonData.weather[0].main;
			return callback('In '+ city + ', the current conditions are ' + temp + ' degrees and '+ condition);
		});	
	});
}

module.exports = {
	getWeatherByCity: getWeatherByCity
};

