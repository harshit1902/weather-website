const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFyc2hpdDE5IiwiYSI6ImNrZjE4aGgyeTExYzUycW9jcnV6ZXh5MG4ifQ.dasjKeXF9SYfwkMkEFYLEA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!!", undefined);
    } else if (body.message || body.features.length === 0) {
      callback("Unable to fetch location!!", undefined);
    } else {
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
