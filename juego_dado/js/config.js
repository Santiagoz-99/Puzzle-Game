export function initPlayerSelect() {

    const select = document.getElementById("playerSelect");
    const display = select.querySelector(".select-display");
    const optionsContainer = document.getElementById("playerOptions");
    const selectedText = document.getElementById("selectedPlayers");

    const playerCounts = [2, 3, 4, 5, 6];

    playerCounts.forEach(count => {

        const option = document.createElement("div");
        option.classList.add("select-option");
        option.innerText = `${count} jugadores`;

        option.onclick = () => {
            selectedText.innerText = `${count} jugadores`;
            optionsContainer.classList.remove("show");
            optionsContainer.dataset.value = count;
        };

        optionsContainer.appendChild(option);
    });

    /* Abrir / cerrar al hacer click */

    display.onclick = () => {
        optionsContainer.classList.toggle("show");
    };

    /* 🔥 CIERRE AUTOMÁTICO AL SALIR */

    select.addEventListener("mouseleave", () => {
        optionsContainer.classList.remove("show");
    });

    return {
        getValue() {
            return Number(optionsContainer.dataset.value);
        }
    };
}
