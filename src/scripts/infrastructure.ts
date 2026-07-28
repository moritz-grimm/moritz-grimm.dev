type Service = {
    name: string,
    status: number,
    ping: number,
    uptime24h: number
};

const statusElements = document.querySelectorAll(".infrastructure-status");

async function updateStatus(): Promise<void> {
    let services: Service[];
    try {
        const response = await fetch("https://api.moritz-grimm.dev/status");
        if (!response.ok) throw new Error(response.statusText);
        services = await response.json() as Service[];
    } catch (err) {
        console.error("Error fetching from api.moritz-grimm.dev", err);
        return;
    }

    statusElements.forEach(element => {
        const serviceName = (element as HTMLElement).dataset.service;
        const service = services.find(service => service.name === serviceName);

        element.classList.remove("online", "offline");
        element.classList.add(service?.status === 1 ? "online" : "offline");
    });
}

// void instead of await here to decouple module evaluation from fetch
void updateStatus();
setInterval(() => void updateStatus(), 60000);
