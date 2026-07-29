// Copyright
const footerYear = document.getElementById("footer-year");
if (footerYear) {
    footerYear.textContent = `${new Date().getFullYear()}`;
}

// Version
const versionEl = document.querySelectorAll(".app-version");
versionEl.forEach(element => {
    element.textContent = `v${__APP_VERSION__ ?? "1.0.0"}`;
});

// Last Updated
const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
    let date;
    try {
        const res = await fetch("https://api.moritz-grimm.dev/last-updated/moritz-grimm.dev");
        date = await res.json() as { lastUpdated?: string };
    } catch (err) {
        console.error("Error fetching from api.moritz-grimm.dev", err);
    }

    lastUpdatedEl.textContent = `Last Updated: ${date?.lastUpdated ?? "Unknown"}`;
}
