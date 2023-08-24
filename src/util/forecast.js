const request = require("request");

const foreCast = (long, lan, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=91d087ce5a04f6aec33baae0b90eefa7&query=${long},${lan}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("cant get the request", undefined);
    } else if (body.error) {
      callback("cant find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out."
      );
    }
  });
};
module.exports = foreCast;
