function showModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}


function hideModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add("slide-out");
    setTimeout(function() {
        modal.style.display = "none";
        modal.classList.remove("slide-out");
    }, 500);
}

function checkLogin() {
    var loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("registerBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("registerBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
}

window.logout = function() {
    localStorage.setItem("loggedIn", "false");
    checkLogin();
    alert("Log out succesfull!");
}


document.getElementById("loginBtn").addEventListener("click", function() {
    showModal("loginModal");
});

document.getElementById("registerBtn").addEventListener("click", function() {
    showModal("registerModal");
});


var closeButtons = document.getElementsByClassName("close");
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function() {
        hideModal("loginModal");
        hideModal("registerModal");
    });
}


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("You succesfully logged in!");
        localStorage.setItem("loggedIn", "true");
        checkLogin();
        hideModal("loginModal");
    } else if (storedUsername === username) {
        alert("Incorrect password");
    } else {
        alert("There is no user with this username");
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var newUsername = document.getElementById("newUsername").value;
    var newEmail = document.getElementById("newEmail").value;
    var newPassword = document.getElementById("newPassword").value;

    localStorage.setItem("username", newUsername);
    localStorage.setItem("email", newEmail);
    localStorage.setItem("password", newPassword);
    alert("Registration is succesfull. You can log in now");
    hideModal("registerModal");
});

window.onload = function() {
    checkLogin();
};
