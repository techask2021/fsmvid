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
    const [jobDetails, setJobDetails] = useState({ quality: '', format: '', platform: '' });
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [liveMessage, setLiveMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        let interval: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                // Add timestamp to prevent caching
                const res = await fetch(`/api/bulk-download/status/${jobId}?t=${Date.now()}`);
                if (!res.ok) return;

                const data = await res.json();

                if (!isMounted) return;

                setStatus(data.status);
                setProgress(data.progress || 0);
                setLiveMessage(data.error); // Capture live pulse messages
                setStats({
                    total: data.total || 0,
                    completed: data.completed || 0,
                    failed: data.failed || 0,
                    results: data.results || []
                } as any);
                setJobDetails({
                    quality: data.quality || 'Auto',
                    format: data.format || 'mp4',
                    platform: data.platform || 'General'
                });

                if (data.status === 'completed' && data.zipUrl) {
                    setDownloadUrl(data.zipUrl);
                    if (onComplete) onComplete(data.zipUrl);
                    clearInterval(interval);
                }

                if (data.status === 'failed') {
                    setError(data.error || "Job failed");
                    clearInterval(interval);
                }

            } catch (err) {
                console.error("Polling error:", err);
            }
        };

        // Poll every 1.5 seconds for high-speed updates
        if (status !== 'completed' && status !== 'failed') {
            checkStatus(); // Initial check
            interval = setInterval(checkStatus, 1500);
        } else if (status === 'completed') {
            checkStatus(); // Ensure we have the final list
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
                <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">Queued</p>
                    <p className="text-xs text-muted-foreground">Waiting for worker...</p>
                </div>
                {jobDetails.platform && (
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground">
                        {jobDetails.platform}
                    </Badge>
                )}
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
        const results = (stats as any).results || [];

        return (
            <div className="space-y-4">
                <Card className="bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-800">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                            <div>
                                <h4 className="font-bold text-green-900 dark:text-green-300 text-sm">Download Ready!</h4>
                                <p className="text-xs text-green-700 dark:text-green-400">
                                    {stats.completed} {jobDetails.platform} videos processed successfully.
                                </p>
                            </div>
                        </div>
                        {downloadUrl && (
                            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm shrink-0">
                                <a href={downloadUrl} download>
                                    <FileArchive className="mr-2 h-4 w-4" />
                                    Download ZIP
                                </a>
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Individual Results List */}
                {results.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {results.map((result: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-muted group hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
                                        <Loader2 className="w-4 h-4 text-muted-foreground/30" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold truncate max-w-[200px]" title={result.title || result.filename}>
                                            {result.title || result.filename}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">
                                            {jobDetails.quality}{jobDetails.format !== 'mp3' ? 'p' : ''} {jobDetails.format.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase tracking-widest px-4 hover:bg-blue-600 hover:text-white transition-all" asChild>
                                    <a href={result.download_url} target="_blank" rel="noopener noreferrer">
                                        Download
                                    </a>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Processing State
    return (
        <div className="space-y-4 p-4 border rounded-lg bg-card shadow-sm relative overflow-hidden">
            {/* Background Gradient for 'Turbo' feel */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />

            <div className="flex items-center justify-between mb-1 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                        <div className="absolute inset-0 bg-blue-500/10 blur-sm rounded-full animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">Processing Batch...</span>
                            <Badge className="bg-blue-600/10 text-blue-600 border-blue-600/20 text-[9px] px-1 h-3.5 animate-pulse">
                                TURBO SPEED
                            </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Badge variant="secondary" className="text-[9px] h-3.5 leading-none px-1.5 uppercase font-black tracking-tighter">
                                {jobDetails.platform}
                            </Badge>
                            <Badge variant="secondary" className="text-[9px] h-3.5 leading-none px-1.5 uppercase font-black tracking-tighter">
                                {jobDetails.quality}{jobDetails.format !== 'mp3' ? 'p' : ''} {jobDetails.format.toUpperCase()}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-sm font-black text-blue-600">
                        {stats.completed}/{stats.total}
                    </span>
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold">Videos</span>
                </div>
            </div>

            <Progress value={progress} className="h-2.5 bg-blue-100" />

            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground/70 tracking-widest mt-2 relative z-10">
                <span className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                    {stats.completed >= stats.total ? (
                        "Finishing up..."
                    ) : (
                        liveMessage ? liveMessage : `Processing... ${stats.completed}/${stats.total}`
                    )}
                </span>
                <span>Links expire in 24h</span>
            </div>

            {/* Processing Notice */}
            <div className="mt-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50 text-blue-600/70 text-[10px] font-medium leading-relaxed italic animate-in fade-in slide-in-from-bottom-2 duration-1000">
                <p>Note: Processing time varies based on video file sizes and platform response times. Large 4K/HD files may take several minutes to synchronize. Please keep this session active.</p>
            </div>

            {/* Real-time Individual Results during processing */}
            {(stats as any).results?.length > 0 && (
                <div className="mt-4 pt-4 border-t divide-y max-h-[200px] overflow-y-auto custom-scrollbar">
                    {(stats as any).results.map((result: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between py-2 group">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                <span className="text-[10px] font-medium truncate" title={result.title}>{result.title}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-6 text-[9px] font-bold uppercase hover:bg-blue-600 hover:text-white px-2" asChild>
                                <a href={result.download_url} target="_blank" rel="noopener noreferrer">Download</a>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
