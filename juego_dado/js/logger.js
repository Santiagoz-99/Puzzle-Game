export function log(container, message, type = "system") {

    const entry = document.createElement("div");
    entry.classList.add("log-entry", type);

    entry.innerHTML = message;

    container.prepend(entry);
}
