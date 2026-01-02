import { BulkDownloader } from "@/components/download/bulk-downloader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bulk Video Downloader | Download Multiple Videos at Once",
    description: "Download multiple videos from YouTube, TikTok, Instagram, and more in a single batch. Save time with our high-speed bulk downloader.",
};

export default function BulkDownloadPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent pb-2">
                    Bulk Video Downloader
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Paste your links below and let our cloud servers handle the rest.
                    Download playlists, multiple clips, or entire channels in seconds.
                </p>
            </div>

            <BulkDownloader />

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-xl bg-card border shadow-sm">
                    <div className="text-3xl mb-3">⚡</div>
                    <h3 className="font-semibold text-lg mb-2">High Speed</h3>
                    <p className="text-sm text-muted-foreground">
                        Our cloud servers process videos in parallel for maximum speed.
                    </p>
                </div>
                <div className="p-6 rounded-xl bg-card border shadow-sm">
                    <div className="text-3xl mb-3">📦</div>
                    <h3 className="font-semibold text-lg mb-2">One ZIP File</h3>
                    <p className="text-sm text-muted-foreground">
                        Get all your videos neatly failed into a single ZIP archive.
                    </p>
                </div>
                <div className="p-6 rounded-xl bg-card border shadow-sm">
                    <div className="text-3xl mb-3">☁️</div>
                    <h3 className="font-semibold text-lg mb-2">Background Mode</h3>
                    <p className="text-sm text-muted-foreground">
                        Close the tab and relax. We'll email you the link when it's done.
                    </p>
                </div>
            </div>
        </div>
    );
}
