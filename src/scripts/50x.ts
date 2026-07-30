const statusMessages = new Map([
    [500, "Internal Server Error"],
    [502, "Bad Gateway"],
    [503, "Service Unavailable"],
    [504, "Gateway Timeout"],
]);

const statusCode = Number(new URLSearchParams(window.location.search).get("code"));
const code = statusMessages.has(statusCode) ? String(statusCode) : "50x";
const message = statusMessages.get(statusCode) ?? "Something went wrong";

document.querySelectorAll<HTMLElement>("[data-error-code]").forEach(element => {
    element.textContent = code;
});

document.querySelectorAll<HTMLElement>("[data-error-text]").forEach(element => {
    element.textContent = message;
});

document.title = `MORITZ GRIMM // DEV | ${code} // ${message.toUpperCase()}`;

document.querySelector<HTMLElement>("h1[data-error-code]")?.setAttribute("aria-label", `${code} – ${message}`);
