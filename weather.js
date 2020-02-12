function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        console.log("Failed");
    }
}

function fetchData(url) {
    fetch(url)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    var weather = document.getElementsByClassName("weather__temp");
                    var coord = document.getElementsByClassName("weather__coords");
                    var location = document.getElementsByClassName("weather__location");

                    var tempp = "<p class='design'> Temperture: " + data.main.temp + "°C" + "</p>";
                    var coords = "<p class='design'> Naam van de stad: " + data.name + "</p>";
                    var loc = "<p class='design'> Coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";

                    weather[0].innerHTML += tempp;
                    coord[0].innerHTML += coords;
                    location[0].innerHTML += loc;
                });
            } else {
                console.log("response failed");
            }
        });
}

function showLocation(position) {
    console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";
    fetchData(url);
}

function getInputValue() {
    document.querySelector(".button").addEventListener("click", function () {
        var city = document.querySelector(".addCity").value;
        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";
        console.log(url);
        fetchData(url);
    });
}

getLocation();
getInputValue();