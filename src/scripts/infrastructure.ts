type Service = {
    name: string,
    status: number,
    ping: number,
    uptime24h: number
};

const statusElements = document.querySelectorAll(".infrastructure-status");

const CACHE_KEY = "infraStatus";
const CACHE_TIME_KEY = "infraStatusCachedAt";
const TTL = 60_000;

async function updateStatus(): Promise<void> {
    const cached = sessionStorage.getItem(CACHE_KEY);
    const cachedAt = sessionStorage.getItem(CACHE_TIME_KEY);

    let services: Service[];

    if (cached && Date.now() - Number(cachedAt) < TTL) {
        services = JSON.parse(cached) as Service[];
    } else {
        const response = await fetch("https://api.moritz-grimm.dev/status");
        services = await response.json() as Service[];
    }

    statusElements.forEach(element => {
        const serviceName = (element as HTMLElement).dataset.service;
        const service = services.find(s => s.name === serviceName);

        element.classList.remove("online", "offline");
        element.classList.add(service?.status === 1 ? "online" : "offline");
    });
}

await updateStatus();
setInterval(() => void updateStatus(), 60000);
