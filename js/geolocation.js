function getLocation() {
    // Запрашиваем доступ к геолокации
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("locationInfo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Функция для обработки успешного получения местоположения
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    // Вывод информации о местоположении на HTML-страницу
    document.getElementById("locationInfo").innerHTML = `
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>
        <p>Accuracy: ${accuracy} meters</p>
    `;
}

// Функция для обработки ошибок при получении местоположения
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

window.onload = function() {
    alert("To see your geolocation and give this permission to our ebsite, please press allow");
    getLocation();
};