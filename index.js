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

