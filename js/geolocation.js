function getLocation() {
    var locationToggle = document.getElementById("locationToggle");
    
    if (navigator.geolocation) {
        if (locationToggle.checked) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            document.getElementById("locationInfo").innerHTML = "Geolocation is turned off.";
        }
    } else {
        document.getElementById("locationInfo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getCityName(latitude, longitude);
}

function getCityName(latitude, longitude) {
    var apiKey = 'c3eac1a8b3cff35065386cc954cba7bf';
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var city = data.name;
            var country = data.sys.country;
            document.getElementById("locationInfo").innerHTML += `<p>City: ${city}, Country: ${country}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("locationInfo").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("locationInfo").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("locationInfo").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("locationInfo").innerHTML = "An unknown error occurred.";
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var locationToggle = document.getElementById("locationToggle");

    locationToggle.addEventListener("change", function() {
        if (locationToggle.checked) {
            getLocation();
        } else {
            document.getElementById("locationInfo").innerHTML = "Geolocation is turned off.";
        }
    });
});
