export function renderPlayers(game) {

    const circle = document.getElementById("playersCircle");

    circle.innerHTML = `
        <div id="diceMessage" class="dice-message"></div>
        <div class="center-dice">
            🎲 <span id="targetDice">${game.targetDice}</span>
        </div>
    `;

    const radius = 210;
    const center = 260;

    game.players.forEach((player, index) => {

        const angle = (index / game.players.length) * (Math.PI * 2);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);

        const seat = document.createElement("div");
        seat.classList.add("player-seat");

        if (index === game.currentPlayerIndex) {
            seat.classList.add("active");
        }

        seat.style.left = `${x - 65}px`;
        seat.style.top = `${y - 45}px`;

        seat.innerHTML = `
            <div class="player-name">${player.name}</div>
            <div class="player-money">$${player.balance}</div>
            <div class="player-roll">
                ${player.lastRoll ? `🎲 ${player.lastRoll}` : ""}
            </div>
        `;

        circle.appendChild(seat);
    });
}

export function updateUI(game, elements) {

    elements.potEl.innerText = game.pot;
    elements.turnEl.innerText = game.currentPlayer.name;
    elements.diceEl.innerText = game.targetDice;

    renderPlayers(game);
}

export function showDiceMessage(value) {

    const el = document.getElementById("diceMessage");

    el.textContent = `Sacaste ${value}`;
    el.classList.add("show");

    setTimeout(() => {
        el.classList.remove("show");
    }, 1000);
}
