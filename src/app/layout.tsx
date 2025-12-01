import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ShockSurgent from "next/font/local";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const shockSurgent = ShockSurgent({
    variable: "--font-shock-surgent",
    src: "../../public/fonts/shock-surgent.otf",
})

export const metadata: Metadata = {
    title: "Moritz Grimm's Website",
    description: "Hello",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${shockSurgent.variable}`}>
                <main>
                    {children}
                    <SpeedInsights/>
                    <Analytics/>
                </main>
            </body>
        </html>
    );
}
