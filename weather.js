// gets my current location
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        console.log("Failed");
    }
    loadStoreCity();
}

// hier return ik mijn fetched data
async function fetchData(url, current = false) {
    return fetch(url)
        .then(function(response) {
            if(response.ok) {
                return response.json().then(function(data) {
                    return data;
                });
            } else {
                console.log("response failed");
            }
        });
}

// hier heb ik een function die mijn nieuwe divs aanmaakt & mijn gefetched data in die div zet.
function newDiv(data) {
    const div = document.createElement("div");
    div.classList.add("cards");

    const tempp = "<p> Temperture: " + data.main.temp + "°C" + "</p>";
    const coords = "<p> Naam van de stad: " + data.name + "</p>";
    const loc = "<p> Coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";

    div.innerHTML += tempp;
    div.innerHTML += coords;
    div.innerHTML += loc;
    return render(div);
}

// hier is
function render(element) {
    return document.body.appendChild(element);
}

async function showLocation(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";
    let data = await fetchData(url, true);
    console.log(data);
    newDiv(data);
}

function getInputValue() {
    document.querySelector(".button").addEventListener("click", async function () {
        const value = document.querySelector(".addCity").value;
        document.querySelector(".weather").append(value);
        const url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";
        console.log(url);
        let data = await fetchData(url);
        newDiv(data);
        storeCity(value);
    });
}

function storeCity(value) {
    // Get the current items
    let city = JSON.parse(localStorage.getItem("cityName"));
    // If no items, create Array
    if (!city) {
      city = [];
    }
    city.push(value);
    localStorage.setItem("cityName", JSON.stringify(city));
}

function loadStoreCity() {
    // Get the items
    const city = JSON.parse(localStorage.getItem("cityName"));
    // If there are no items, do nothing
    if (!city) {
      return false;
    }
        city.forEach(async function(value){
            console.log(value);
            const url =  "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";

            let data = await fetchData(url);
            newDiv(data);
        });
    }

getLocation();
getInputValue();