const request = require("request");

const getGeo = (country, cb) => {
  request(
    {
      url: `https://countries-cities.p.rapidapi.com/location/country/${country}/geojson`,
      json: true,
      headers: {
        "X-RapidAPI-Key": "82ec6e2cdfmshb3154107270b8f2p12e7cdjsn8ec113a979ec",
      },
    },
    (error, { body } = {}) => {
      try {
        if (error) {
          throw error;
        } else {
          cb(undefined, {
            lan: JSON.parse(body["geo_json"])?.[
              "coordinates"
            ]?.[0]?.[0]?.[0]?.[0],
            long: JSON.parse(body["geo_json"])?.[
              "coordinates"
            ]?.[0]?.[0]?.[0]?.[1],
          });
        }
      } catch (error) {
        cb(error, undefined);
      }
    }
  );
};

module.exports = getGeo;
