/**
* @brief Shows a modal by id
* @param modalId The id of the
*/
function showModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}


/**
* @brief Hides and shows a modal
* @param modalId id of modal to
*/
function hideModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.add("slide-out");
    /**
    * @brief / / object
    */
    setTimeout(function() {
        modal.style.display = "none";
        modal.classList.remove("slide-out");
    }, 500);
}

/**
* @brief Function to check if user is logged
*/
function checkLogin() {
    var loggedIn = localStorage.getItem("loggedIn");
    // If logged in is true then the browser will be redirected to the login button.
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

/**
* @brief / / object
*/
window.logout = function() {
    localStorage.setItem("loggedIn", "false");
    checkLogin();
    alert("Log out succesfull!");
}


/**
* @brief / / object
*/
document.getElementById("loginBtn").addEventListener("click", function() {
    showModal("loginModal");
});

/**
* @brief / / object
*/
document.getElementById("registerBtn").addEventListener("click", function() {
    showModal("registerModal");
});


var closeButtons = document.getElementsByClassName("close");
// Add event listeners to all close buttons
for (var i = 0; i < closeButtons.length; i++) {
    /**
    * @brief / / object
    */
    closeButtons[i].addEventListener("click", function() {
        hideModal("loginModal");
        hideModal("registerModal");
    });
}


/**
* @param event
*/
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    // Checks if the user is logged in and if the username and password are equal
    if (username === storedUsername && password === storedPassword) {
        alert("You succesfully logged in!");
        localStorage.setItem("loggedIn", "true");
        checkLogin();
        hideModal("loginModal");
    // Checks if the stored username is correct
    } else if (storedUsername === username) {
        alert("Incorrect password");
    } else {
        alert("There is no user with this username");
    }
});

/**
* @param event
*/
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

/**
* @brief / / object
*/
window.onload = function() {
    checkLogin();
};
