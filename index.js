import Game from './js/game.js';
import View from './js/view.js';
import Controller from './js/controller.js'

const root = document.querySelector("#game");

const game = new Game();
const view = new View(root, 432, 576, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
// Funkce pro zobrazení modálního okna
function showModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Funkce pro skrytí modálního okna
function hideModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Funkce pro kontrolu přihlášení
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
}


// Obsluha přihlášení
document.getElementById("loginBtn").addEventListener("click", function() {
    showModal("loginModal");
});

// Obsluha registrace
document.getElementById("registerBtn").addEventListener("click", function() {
    showModal("registerModal");
});

// Obsluha zavření modálních oken
var closeButtons = document.getElementsByClassName("close");
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function() {
        hideModal("loginModal");
        hideModal("registerModal");
    });
}

// Obsluha formuláře pro přihlášení
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var storedUsername = localStorage.getItem("username");
    var storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Přihlášení úspěšné!");
        localStorage.setItem("loggedIn", "true");
        checkLogin();
        hideModal("loginModal");
    } else if (storedUsername === username) {
        alert("Bylo zadané nesprávné heslo.");
    } else {
        alert("Takový uživatel neexistuje.");
    }
});

// Obsluha formuláře pro registraci
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    alert("Registrace proběhla úspěšně. Nyní se můžete přihlásit.");
    hideModal("registerModal");
});

// Kontrola přihlášení při načtení stránky
window.onload = function() {
    checkLogin();
};
