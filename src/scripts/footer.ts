import { getLastCommitDate } from "./githubApi";

const footerEl = document.getElementById("footer-text");

// Copyright
if (footerEl) {
    footerEl.innerHTML = `Copyright © 2025 - ${new Date().getFullYear()} 
                            | moritz-grimm.dev 
                            | Built by Moritz 
                            | <a href="/impressum.html">Impressum</a>
                            | <a href="/privacy-policy.html">Privacy Policy</a>
                            | <a href="https://status.moritz-grimm.dev/status/default" target="_blank" rel="noopener noreferrer">Status</a>`;
}

// Last Updated
const lastUpdatedEl = document.getElementById("last-updated");
if (lastUpdatedEl) {
    const date = await getLastCommitDate();
    lastUpdatedEl.textContent = `Last Updated: ${date ?? "Unknown"}`;
}

// Version
const versionEl = document.querySelectorAll(".app-version");

versionEl.forEach(element => {
    element.textContent = `v${__APP_VERSION__ ?? "v1.0.0"}`;
});
