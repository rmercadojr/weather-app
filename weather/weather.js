const request = require('request');

const darkskyKey = '2facc88941a418618bb9f93156f59ddd';

module.exports.getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        feelsLike: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
}