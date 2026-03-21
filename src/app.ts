import type { Endpoints } from "@octokit/types";
import "./scripts/infrastructure";

type Commits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

const CACHE_KEY = "lastCommitDate";
const CACHE_TIME_KEY = "lastCommitDateCachedAt";
const CACHE_TTL = 86400000; // 24h

const lastUpdatedEl = document.getElementById("last-updated");
const footerEl = document.getElementById("footer-text");

if (footerEl) {
    footerEl.innerHTML = `Copyright © 2025 - ${new Date().getFullYear()} 
                            | moritz-grimm.dev 
                            | Built by Moritz 
                            | <a href="/impressum.html">Impressum</a> 
                            | <a href="https://status.moritz-grimm.dev/status/default" target="_blank" rel="noopener noreferrer">Status</a>`;
}

let lastCommitDate = localStorage.getItem(CACHE_KEY);
const cachetAt = localStorage.getItem(CACHE_TIME_KEY);

if (!lastCommitDate || Date.now() - Number(cachetAt) > CACHE_TTL ) {
    const response = await fetch("https://api.github.com/repos/moritz-grimm/moritz-grimm.dev/commits");
    const commits = await response.json() as Commits;
    lastCommitDate = commits[0].commit.committer?.date?.split("T")[0] ?? null;

    if (lastCommitDate) {
        localStorage.setItem(CACHE_KEY, String(lastCommitDate));
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    }
}

if (lastUpdatedEl) {
    lastUpdatedEl.textContent = `Last Updated: ${lastCommitDate ?? "Unknown"}`;
}

const versionEl = document.querySelectorAll(".app-version");

versionEl.forEach(element => {
    element.textContent = `v${__APP_VERSION__ ?? "v1.0.0"}`;
});
