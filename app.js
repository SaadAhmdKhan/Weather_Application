let cityInput = document.getElementById("cityinp")
let temperature = document.getElementById("temp")
let windSpeed = document.getElementById("speed")
let feelsLike = document.getElementById("Feels")
let placeLocation = document.getElementById("loc")

async function checkWeather(){
    try{
        if(cityInput.value.trim() !== ''){
            const baseurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=5aec062d4074763c1bd9e97fcb5f8749`
            let fetchResult = await fetch(baseurl)
            if(!fetchResult.ok && fetchResult.statusText === 'Not Found'){
                alert('City Not Found')
            }else{
                let ResultJson = await fetchResult.json()
                showWeather(ResultJson)
                cityInput.value = ''
            }
            
        } else{
            alert('Please Enter Any City Name')
        }
    } catch (error){
        console.log(error)
    }
}

function showWeather(weatherData){
    console.log(weatherData)
    placeLocation.innerText = weatherData.name
    temperature.innerText = `${Math.floor(weatherData.main.temp - 273.15)}\u00B0C`
    windSpeed.innerText = `${weatherData.wind.speed} km/hr`
    feelsLike.innerText = `${Math.floor(weatherData.main.feels_like - 273.15)}\u00B0C`
}

window.onload = function(){
    if(navigator) {
        navigator.geolocation.getCurrentPosition(getUserPosition)
    }
}

async function checkLocationWeather(lat , lon){
    console.log('runing....')
    try{
        if(cityInput.value.trim() !== "" ){
            const baseurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5aec062d4074763c1bd9e97fcb5f8749`
            let fetchResult = await fetch(baseurl)
            if(!fetchResult.ok && fetchResult.statusText === 'Not Found'){
                // alert('City Not Found')
            }else{
                let ResultJson = await fetchResult.json()
                showWeather(ResultJson)
            }
            // alert('Please Enter Any City Name')
        }
    } catch (error){
        console.log(error)
    }
}

function getUserPosition(data) {
    console.log(data)
    checkLocationWeather(data.coords.latitude , data.coords.longitude)
}

