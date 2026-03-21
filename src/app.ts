import type { Endpoints } from "@octokit/types";

type Commits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

const CACHE_KEY = "lastCommitCache";
const CACHE_TIME_KEY = "lastCommitCacheTime";
const CACHE_TTL = 86400000;

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
