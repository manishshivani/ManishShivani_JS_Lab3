const apiDetails={
    key:"7e3f21edee540e6110af347b55eb1ab2",
    base:"https://api.openweathermap.org/data/2.5/",
    service:"weather"
}

//Onload get details of Delhi Weather
window.addEventListener('load',()=>{getWeatherResults('New Delhi');});

const searchBox= document.querySelector('.search__box');

searchBox.addEventListener('keydown',setQuery);

function setQuery(event){
    if(event.keyCode==13){
        getWeatherResults(searchBox.value);
    }
}

function getWeatherResults(cityName){
    fetch(`${apiDetails.base}${apiDetails.service}?q=${cityName}&units=metric&appid=${apiDetails.key}`)
    .then(wheather => wheather.json())
    .then((response) => displayResults(response));
}

function displayResults(weatherResponse){

    if(weatherResponse.cod=='404'){
        alert('City Name is not valid. Please Enter a valid City Name. Thank You!');
    }

    let city=document.querySelector('.location .city');
    city.innerText=`${weatherResponse.name}, ${weatherResponse.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherResponse.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weatherResponse.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weatherResponse.main.temp_min)}°c / ${Math.round(weatherResponse.main.temp_max)}°c`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }