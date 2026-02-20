import { Game } from './game.js';
import { updateUI, showDiceMessage } from './ui.js';
import { log } from './logger.js';
import { initPlayerSelect } from './config.js';

document.addEventListener("DOMContentLoaded", () => {

    let game;

    const playerSelector = initPlayerSelect();

    const elements = {
        potEl: document.getElementById("pot"),
        turnEl: document.getElementById("turn"),
        diceEl: document.getElementById("targetDice"),
        logEl: document.getElementById("log"),
        betInput: document.getElementById("betAmount"),
        startMoneyEl: document.getElementById("startMoney"),
    };

    function handleStart() {

        const count = playerSelector.getValue();

        if (!count) {
            alert("Selecciona jugadores");
            return;
        }

        const players = [];

        for (let i = 1; i <= count; i++) {
            players.push(`Jugador ${i}`);
        }

        game = new Game(players, Number(elements.startMoneyEl.value));

        elements.logEl.innerHTML = "";

        log(elements.logEl, "Partida iniciada");
        updateUI(game, elements);
    }

    function handleBet() {

        if (!game) return;

        const betAmount = Number(elements.betInput.value);
        const player = game.currentPlayer;

        const result = game.playTurn(betAmount);

        if (result.action === "invalid_bet") {
            log(elements.logEl, "Apuesta inválida");
            return;
        }

        showDiceMessage(result.roll);

        if (result.action === "win") {
            log(elements.logEl, `<strong>${player.name}</strong> gana $${result.winnings}`, "player");
        } else {
            log(elements.logEl, `${player.name} pierde`, "player");
            game.nextTurn();
        }

        updateUI(game, elements);
    }

    function handlePass() {

        if (!game) return;

        log(elements.logEl, `${game.currentPlayer.name} pasa`, "player");

        game.nextTurn();
        updateUI(game, elements);
    }

    document.getElementById("startGame").onclick = handleStart;
    document.getElementById("btnIr").onclick = handleBet;
    document.getElementById("btnPasar").onclick = handlePass;
});
