/* dom manipulation and eventlistener */

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


// update browser
const updateUI = (data) => {

  const cityDetails = data.cityDetails;
  const weather = data.weather;

  // update details template
  details.innerHTML = ` 
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update day/night and icon img
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if(weather.IsDayTime) {
    timeSrc = 'img/day.svg';
  } else {
    timeSrc = 'img/night.svg';
  };
  // set card day/night img
  time.setAttribute('src', timeSrc);

  // remove class d-none from card if of first instance
  if(card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  };  
};


// get input from the city field
const updateCity = async (city) => {
  
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    // cityDetails: cityDetails,
    // weather: weather

    // using object shorthand notation
    cityDetails,
    weather
  };
};

cityForm.addEventListener('submit', (e) => {

  // prevent browser refreash
  e.preventDefault();
  
  // input field value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => updateUI(err));

  // set localStorage
  localStorage.setItem('location', city);   // city from input field, set to store only the most recent location

});

// check if location is set in localStorage, if there is then display output even when page loaded or refreshed
if (localStorage.getItem('location')) {
  updateCity(localStorage.getItem('location'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
};
  
