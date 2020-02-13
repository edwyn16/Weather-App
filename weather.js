function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        console.log("Failed");
    }
}

function fetchData(url, current = false) {
    fetch(url)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {

                    var div = document.createElement("div");
                    div.classList.add("cards");

                    var tempp = "<p> Temperture: " + data.main.temp + "°C" + "</p>";
                    var coords = "<p> Naam van de stad: " + data.name + "</p>";
                    var loc = "<p> Coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";

                    div.innerHTML += tempp;
                    div.innerHTML += coords;
                    div.innerHTML += loc;

                    if(current) {

                        weather[0].innerHTML += tempp;
                        coord[0].innerHTML += coords;
                        location[0].innerHTML += loc;

                        return;
                    }
                    return render(div);
                });
            } else {
                console.log("response failed");
            }
        });
}

function render(element) {
    return document.body.appendChild(element);
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
        var value = document.querySelector(".addCity").value;
        document.querySelector(".weather").append(value);
        const url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=e10a28dc8f6f5e57908fa1073297b8ec&units=metric";
        console.log(url);

        // let myObject_Serialized = JSON.stringify(url);
        // console.log(myObject_Serialized);

        fetchData(url);
    });
}

getLocation();
getInputValue();