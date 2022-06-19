/* weather forecast api interaction */

// accaweather api key
const key = '9lAH7qVa4pNH5KOUczDchpgIwOqGCmWr';

// get city information
const getWeather = async (id) => {

  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city information
const getCity = async (city) => {

  // base url for weather database request made to
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

  // query parameter, set to apiKey & city code
  const query = `?apikey=${key}&q=${city}`; 

  // await return to base and query
  const response = await fetch(base + query);
  // convert returned json into readable data
  const data = await response.json();

  // rtn a promise
  return data[0];
};


/* testing */

// getCity('hackney')
//   .then(data => {
//     return getWeather(data.Key);
//   }).then(data => {
//     console.log(data);
//   })
//   .catch(err => console.log(err));

// getWeather(323250);