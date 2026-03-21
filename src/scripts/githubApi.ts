import type { Endpoints } from "@octokit/types";

type Commits = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];

const CACHE_KEY = "lastCommitDate";
const CACHE_TIME_KEY = "lastCommitDateCachedAt";
const CACHE_TTL = 86400000; // 24h

export async function getLastCommitDate(): Promise<string | null> {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedAt = localStorage.getItem(CACHE_TIME_KEY);

    if (cached && Date.now() - Number(cachedAt) < CACHE_TTL) {
        return cached;
    }

    const response = await fetch("https://api.github.com/repos/moritz-grimm/moritz-grimm.dev/commits");
    const commits = await response.json() as Commits;
    const date = commits[0].commit.committer?.date?.split("T")[0] ?? null;

    if (date) {
        localStorage.setItem(CACHE_KEY, date);
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    }

    return date;
}
