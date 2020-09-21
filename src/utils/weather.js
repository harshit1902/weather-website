const request = require("request");

const weather = (latitude, longitude, location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=752587f5c8d8bc41f140f9d49f9ccc7c&query=" +
    `${latitude},${longitude}` +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!!", undefined);
    } else if (body.error) {
      callback("Unable to fetch location!!", undefined);
    } else {
      const data = {
        temperature: body.current.temperature + "F",
        description: body.current.weather_descriptions[0],
        feelsLike: body.current.feelslike + "F",
        updatedAt: body.current.observation_time,
        location: location,
      };
      callback(undefined, data);
    }
  });
};

module.exports = weather;
