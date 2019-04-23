import { Game } from './Game'

let initialize = function () {
    // @ts-ignore   // shows error but no error xD
    window.game = new Game();
};

document.addEventListener("DOMContentLoaded", function () {
    initialize();
});

