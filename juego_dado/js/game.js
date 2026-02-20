export class Game {
    constructor(playerNames, startMoney) {

        this.players = playerNames.map(name => ({
            name,
            balance: startMoney,
            lastRoll: null
        }));

        this.currentPlayerIndex = 0;

        this.pot = 0;
        this.targetDice = this.rollDice();
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    playTurn(betAmount) {

        const player = this.currentPlayer;

        if (betAmount <= 0 || betAmount > player.balance) {
            return { action: "invalid_bet" };
        }

        const roll = this.rollDice();
        player.lastRoll = roll;

        player.balance -= betAmount;
        this.pot += betAmount;

        if (roll > this.targetDice) {

            const winnings = this.pot;

            player.balance += winnings;

            this.resetRound();

            return { action: "win", roll, winnings };
        }

        this.targetDice = roll;

        return { action: "lose", roll };
    }

    nextTurn() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
    }

    resetRound() {

        this.pot = 0;
        this.targetDice = this.rollDice();

        this.players.forEach(p => p.lastRoll = null);
    }
}
