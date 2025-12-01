import { headers } from "next/headers";

export default async function Page() {
    const headersList = await headers();
    const country = headersList.get("x-vercel-ip-country") || "Unknown";

    const greetingMap: Record<string, string> = {
        DE: "Hallo, mein Name ist Moritz",
        AT: "Griaß di, mei Nam is Moritz",
        CH: "Grüezi min Name isch Moritz",
        US: "Hello, my Name is Moritz",
    };

    const greeting = greetingMap[country] || "Hello World, my name is Moritz";

    return (
        <div className="flex items-center justify-center h-screen w-screen overflow-hidden m-0 p-0">
            <h1 className="text-2xl">{greeting}</h1>
        </div>
    );
}
