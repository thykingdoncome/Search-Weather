'use strict';

let appId = '821c606f185beb0be850cd9305f8b48a';
let units = 'imperial';
let searchMethod;

//stating the required input terms by the user
function getSearchMethod(searchTerm) {
    if (searchTerm.length <= 6 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else searchMethod = 'q';
}

//this function fetches the api from openweathermap.org
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result => result.json())
        .then(result => init(result))
}

//To display the appropriate background as fetched from the server
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("images/clear.gif")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("images/cloudy.gif")';
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("images/rain.gif")';
            break;

        case 'Mist':
        case 'Fog':
            document.body.style.backgroundImage = 'url("images/mist.gif")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("images/storm.gif")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("images/snowy.gif")';
            break;

        default:
            break
    }

    //declaring and calling the functions to b displayed and how they will be displayed
    let descriptionElement = document.getElementById('descriptionHead');
    let tempElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humidity');
    let windElement = document.getElementById('wind');
    let cityElement = document.getElementById('city');
    let weatherIconElement = document.getElementById('weatherIcon');

    weatherIconElement.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    descriptionElement.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    tempElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176; ';
    windElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    cityElement.innerHTML = resultFromServer.name;

    weatherInfo();
}

//styling the displays and making it visible when a user searches
function weatherInfo() {
    let wContainer = document.getElementById('wContainer');
    let wContainerHeight = wContainer.clientHeight;
    let wContainerWidth = wContainer.clientWidth;

    wContainer.style.left = `calc(50% - ${wContainerWidth/2}px)`;
    wContainer.style.top = `calc(50% - ${wContainerHeight/1.3}px)`;
    wContainer.style.visibility = 'visible';
}

//the search button on click function
document.getElementById('searchButt').addEventListener('click', () => {
    let searchTerm = document.getElementById('input').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})