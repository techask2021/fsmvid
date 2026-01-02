"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Download, AlertCircle, Coins } from 'lucide-react';

import { useAuth } from '@/components/auth/auth-provider';

export function BulkDownloader() {
    const router = useRouter();
    const [urls, setUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuth();

    const handleStartDownload = async () => {
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
            return;
        }

        setError(null);
        setIsLoading(true);

        const urlList = urls
            .split('\n')
            .map(u => u.trim())
            .filter(u => u.length > 0);

        if (urlList.length === 0) {
            setError("Please enter at least one URL");
            setIsLoading(false);
            return;
        }

        if (urlList.length > 50) { // Hard limit for safety
            setError("Maximum 50 URLs allowed per batch");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/bulk-download/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    urls: urlList,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 402) {
                    setError(`Insufficient credits. Required: ${data.required}, Available: ${data.available}`);
                } else {
                    setError(data.error || "Failed to start download");
                }
                return;
            }

            // Success! Redirect to status page or dashboard
            router.push(`/dashboard?jobId=${data.jobId}`); // Showing it in dashboard is better

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const urlCount = urls.split('\n').filter(u => u.trim().length > 0).length;
    const creditCost = Math.ceil(urlCount / 2);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Download className="w-6 h-6 text-primary" />
                    Bulk Video Downloader
                </CardTitle>
                <CardDescription>
                    Paste multiple video URLs (one per line). Supports YouTube, TikTok, Instagram, and more.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <Textarea
                    placeholder="https://youtube.com/watch?v=...\nhttps://tiktok.com/@user/video/..."
                    className="min-h-[200px] font-mono text-sm"
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                        <span>Videos: <span className="font-medium text-foreground">{urlCount}</span></span>
                        <span className="text-muted-foreground/50">|</span>
                        <span className="flex items-center gap-1">
                            Cost: <span className="font-medium text-foreground">{creditCost}</span> <Coins className="w-3 h-3" />
                        </span>
                    </div>

                    {user ? (
                        <div className="text-xs">
                            Your Credits: <span className="font-bold text-green-600">Checking...</span>
                            {/* We'll fetch real credits in the full dashboard implementation */}
                        </div>
                    ) : (
                        <span className="text-xs text-orange-500">Login to see credits</span>
                    )}
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleStartDownload}
                    disabled={isLoading || urlCount === 0}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Starting Job...
                        </>
                    ) : (
                        <>
                            Start Bulk Download ({creditCost} Credits)
                        </>
                    )}
                </Button>

                {!user && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                        You need to <a href="/login" className="underline hover:text-primary">log in</a> to use bulk downloading.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}


