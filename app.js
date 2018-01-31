const yargs = require('yargs');
const chalk = require('chalk');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(chalk.bgRed(errorMessage));
  } else {
    console.log(chalk.green(results.address));

    weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(chalk.bgRed(`Address: ${errorMessage}`));
      } else {
        console.log(chalk.green(`Temperature: ${weatherResults.temperature}`));
        console.log(chalk.green(`Feels Like: ${weatherResults.feelsLike}`));
      }
    });
  }
});
