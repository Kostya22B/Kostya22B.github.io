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
    var accuracy = position.coords.accuracy;

    document.getElementById("locationInfo").innerHTML = `
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>
        <p>Accuracy: ${accuracy} meters</p>
    `;
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
