const yargs = require('yargs');
const chalk = require('chalk');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      describe: 'Address to fetch weather for.',
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
  const darkskyKey = '2facc88941a418618bb9f93156f59ddd';
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}`;
  let formattedAddress = response.data.results[0].formatted_address;
  console.log(formattedAddress);
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}F and it feels like ${apparentTemperature}F.`);
}).catch((e) => {
  let errorMessage = '';
  if (e.code === 'ENOTFOUND') {
    errorMessage = 'Unable to connect to API servers.';
  } else {
    errorMessage = e.message;
  }
  console.log(chalk.bgRed(errorMessage));
});
