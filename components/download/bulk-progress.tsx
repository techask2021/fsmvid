"use client";

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Clock, XCircle, FileArchive, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkProgressProps {
    jobId: string;
    initialStatus?: string;
    onComplete?: (downloadUrl: string) => void;
}

export function BulkProgress({ jobId, initialStatus, onComplete }: WorkProgressProps) {
    const [status, setStatus] = useState(initialStatus || 'queued');
    const [progress, setProgress] = useState(0);
    const [stats, setStats] = useState({ total: 0, completed: 0, failed: 0 });
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        let interval: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/bulk-download/status/${jobId}`);
                if (!res.ok) return; // Don't crash on network blips

                const data = await res.json();

                if (!isMounted) return;

                setStatus(data.status);
                setProgress(data.progress || 0);
                setStats({
                    total: data.total || 0,
                    completed: data.completed || 0,
                    failed: data.failed || 0
                });

                if (data.status === 'completed' && data.zipUrl) {
                    setDownloadUrl(data.zipUrl);
                    if (onComplete) onComplete(data.zipUrl);
                    clearInterval(interval); // Stop polling
                }

                if (data.status === 'failed') {
                    setError(data.error || "Job failed");
                    clearInterval(interval);
                }

            } catch (err) {
                console.error("Polling error:", err);
            }
        };

        // Poll every 3 seconds
        if (status !== 'completed' && status !== 'failed') {
            checkStatus(); // Initial check
            interval = setInterval(checkStatus, 3000);
        } else if (status === 'completed') {
            checkStatus(); // Ensure we have the URL
        }

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [jobId, status]);

    if (status === 'queued') {
        return (
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-dashed">
                <Clock className="w-5 h-5 text-orange-500 animate-pulse" />
                <div className="flex-1">
                    <p className="font-medium text-sm">Queued</p>
                    <p className="text-xs text-muted-foreground">Waiting for worker...</p>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Download Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (status === 'completed') {
        return (
            <Card className="bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                        <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-300">Ready to Download!</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">
                                {stats.completed} videos processed
                            </p>
                        </div>
                    </div>
                    {downloadUrl && (
                        <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-100">
                            <a href={downloadUrl} download>
                                <FileArchive className="mr-2 h-4 w-4" />
                                Download ZIP
                            </a>
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    }

    // Processing State
    return (
        <div className="space-y-3 p-4 border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="font-medium text-sm">Processing...</span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {stats.completed}/{stats.total} Videos
                </span>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>This may take a few minutes.</span>
                <span>You can close this tab, we'll email you.</span>
            </div>
        </div>
    );
}
