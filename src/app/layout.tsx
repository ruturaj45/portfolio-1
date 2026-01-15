import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ParticleField from "@/components/ui/ParticleField";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Vyagh | Full Stack AI Engineer",
    description:
        "I ship AI products that work. Open source contributor at Sugar Labs Music Blocks.",
    keywords: [
        "Vyagh",
        "Full Stack Developer",
        "AI Engineer",
        "MERN Stack",
        "Open Source",
        "Sugar Labs",
        "Music Blocks",
        "GSoC",
    ],
    authors: [{ name: "Vyagh" }],
    openGraph: {
        title: "Vyagh | Full Stack AI Engineer",
        description:
            "I ship AI products that work. Open source contributor at Sugar Labs.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vyagh | Full Stack AI Engineer",
        description:
            "I ship AI products that work. Open source contributor at Sugar Labs.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
            >
                <ThemeProvider>
                    <ParticleField />
                    <SmoothScroll />
                    <GrainOverlay />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
