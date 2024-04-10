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
* @brief Function to check if user is logged in and if the email is valid
*/
function checkLogin() {
    var loggedIn = localStorage.getItem("loggedIn");
    var avatarData = localStorage.getItem("avatar");

    if (loggedIn === "true") {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("registerBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";

        if (avatarData) {
            var avatarImg = new Image();
            avatarImg.src = avatarData;
            avatarImg.width = 32;
            avatarImg.height = 32;
            var avatarDiv = document.getElementById("#ava");
            //clearing the photo after log out
            avatarDiv.innerHTML = '';
            avatarDiv.appendChild(avatarImg);
        }
    } else {
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("registerBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";

        var avatarDiv = document.getElementById("#ava");
        avatarDiv.innerHTML = '';
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


document.getElementById("avatarInput").addEventListener("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var image = new Image();
        image.onload = function() {
            if (image.width <= 640 && image.height <= 640) {
                var canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                var avatarData = canvas.toDataURL('image/png');
                localStorage.setItem("avatar", avatarData);
            } else {
                alert("Please choose an image with dimensions less than or equal to 640x640 pixels.");
            }
        };
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser !== null) {
        if (password === storedUser.password) {
            alert("You successfully logged in!");
            localStorage.setItem("loggedIn", "true");
            checkLogin();
            hideModal("loginModal");

            var avatarData = storedUser.avatar;
            if (avatarData) {
                var avatarImg = new Image();
                avatarImg.src = avatarData;
                avatarImg.width = 32;
                avatarImg.height = 32;
                var avatarDiv = document.getElementById("#ava");
                avatarDiv.innerHTML = '';
                avatarDiv.appendChild(avatarImg);
            }
        } else {
            alert("Incorrect password");
        }
    } else {
        alert("There is no user with this username");
    }
});



document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var newUsername = document.getElementById("newUsername").value;
    var newEmail = document.getElementById("newEmail").value;
    var newPassword = document.getElementById("newPassword").value;
    var fileInput = document.getElementById("avatarInput");
    var avatarData = "";

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            avatarData = event.target.result;

            var newUser = {
                username: newUsername,
                email: newEmail,
                password: newPassword,
                avatar: avatarData
            };

            localStorage.setItem(newUsername, JSON.stringify(newUser));

            alert("Registration is successful. You can log in now");
            hideModal("registerModal");
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    checkLogin();

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
});