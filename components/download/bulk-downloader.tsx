"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Loader2,
    Download,
    AlertCircle,
    Coins,
    Zap,
    Monitor,
    Music,
    CheckCircle2,
    Layers,
    ArrowRight,
    FileUp
} from 'lucide-react';

import { useAuth } from '@/components/auth/auth-provider';

export function BulkDownloader() {
    const router = useRouter();
    const [urls, setUrls] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, login } = useAuth();
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [quality, setQuality] = useState('1080'); // Default to high
    const [format, setFormat] = useState('mp4'); // Default to video
    const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
    const [isMixedPlatform, setIsMixedPlatform] = useState(false);

    // Fetch user credits on mount
    useEffect(() => {
        if (user) {
            fetch(`/api/bulk-download/status/check-credits?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setUserCredits(data.credits))
                .catch(() => setUserCredits(0));
        }
    }, [user?.id]);

    // Detect platform and check for mixed platforms
    useEffect(() => {
        const urlList = urls.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        if (urlList.length === 0) {
            setDetectedPlatform(null);
            setIsMixedPlatform(false);
            return;
        }

        const platforms = urlList.map(u => {
            if (u.includes('youtube.com') || u.includes('youtu.be')) return 'YouTube';
            if (u.includes('tiktok.com')) return 'TikTok';
            if (u.includes('instagram.com')) return 'Instagram';
            if (u.includes('facebook.com') || u.includes('fb.watch')) return 'Facebook';
            if (u.includes('twitter.com') || u.includes('x.com')) return 'Twitter';
            return 'Other';
        });

        const uniquePlatforms = Array.from(new Set(platforms));
        if (uniquePlatforms.length > 1) {
            setIsMixedPlatform(true);
            setDetectedPlatform(null);
        } else {
            setIsMixedPlatform(false);
            setDetectedPlatform(uniquePlatforms[0]);
        }
    }, [urls]);

    const handleStartDownload = async () => {
        if (!user) {
            login();
            return;
        }

        if (isMixedPlatform) {
            setError("Bulk download only supports one platform at a time (e.g., only YouTube links).");
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

        try {
            const response = await fetch('/api/bulk-download/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    urls: urlList,
                    userId: user.id,
                    quality_preference: quality,
                    format_preference: format,
                    platform: detectedPlatform
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

            router.push(`/dashboard?jobId=${data.jobId}`);

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const urlCount = urls.split('\n').filter(u => u.trim().length > 0).length;
    const creditCost = Math.ceil(urlCount / 2); // 1 credit per 2 videos

    return (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white/95 backdrop-blur-3xl relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2" />

                <CardContent className="p-8 lg:p-12 space-y-10 relative z-10">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black tracking-tighter italic flex items-center gap-3">
                                <span className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                                    <Download className="w-6 h-6 text-white" />
                                </span>
                                BATCH <span className="text-blue-600">ACQUISITION</span>
                            </h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Universal Cloud Downloader v2.0</p>
                        </div>
                        {detectedPlatform && (
                            <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 animate-in slide-in-from-right-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{detectedPlatform} Verified</span>
                            </div>
                        )}
                    </div>

                    {/* URL Entry */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Sequence</p>
                            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{urlCount} Units Identified</span>
                        </div>

                        {/* File Drop Zone */}
                        <div
                            className="border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 rounded-[2.5rem] p-8 text-center transition-all cursor-pointer group/drop"
                            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const files = Array.from(e.dataTransfer.files);
                                files.forEach(file => {
                                    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            const text = ev.target?.result as string;
                                            if (text) setUrls(prev => (prev ? prev + '\n' : '') + text);
                                        };
                                        reader.readAsText(file);
                                    }
                                });
                            }}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".txt"
                                multiple
                                onChange={(e) => {
                                    if (e.target.files) {
                                        const files = Array.from(e.target.files);
                                        files.forEach(file => {
                                            if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                                                const reader = new FileReader();
                                                reader.onload = (ev) => {
                                                    const text = ev.target?.result as string;
                                                    if (text) setUrls(prev => (prev ? prev + '\n' : '') + text);
                                                };
                                                reader.readAsText(file);
                                            }
                                        });
                                    }
                                }}
                            />
                            <div className="flex flex-col items-center gap-3">
                                <div className="p-4 bg-white rounded-full shadow-lg group-hover/drop:scale-110 transition-transform">
                                    <FileUp className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-black text-slate-700 uppercase text-xs tracking-widest">Import from File</p>
                                    <p className="text-[10px] text-slate-400 font-bold">Drag & Drop .txt files containing links</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center gap-4">
                            <div className="h-[1px] bg-slate-100 flex-1"></div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR ENTER MANUALLY</span>
                            <div className="h-[1px] bg-slate-100 flex-1"></div>
                        </div>

                        <div className="relative group">
                            <Textarea
                                placeholder="Paste target URLs here (one per line)..."
                                className="min-h-[220px] rounded-[2.5rem] bg-slate-50 border-none px-8 py-8 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none resize-none placeholder:text-slate-300"
                                value={urls}
                                onChange={(e) => setUrls(e.target.value)}
                            />
                            <div className="absolute bottom-6 right-8 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <Layers className="w-8 h-8 text-slate-300" />
                            </div>
                        </div>
                        {isMixedPlatform && (
                            <Alert variant="destructive" className="rounded-3xl bg-red-50 border-red-100 border text-red-600 p-6">
                                <AlertCircle className="h-5 w-5" />
                                <AlertDescription className="font-bold ml-2">Mixed protocol signature detected. Use only one platform per batch.</AlertDescription>
                            </Alert>
                        )}
                        <p className="px-1 text-[10px] font-bold text-slate-400 leading-normal text-center">
                            <span className="text-blue-500">Note:</span> Max 50 URLs per batch. Please use links from a <span className="text-slate-500 underline decoration-slate-300 underline-offset-2">single platform</span> at a time.
                        </p>
                    </div>

                    {/* Configurations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Format Toggle */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Format Specification</p>
                            <div className="flex p-1.5 bg-slate-100 rounded-[2rem] w-fit">
                                <button
                                    onClick={() => setFormat('mp4')}
                                    className={`flex items-center gap-3 px-8 h-12 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${format === 'mp4' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Monitor className="w-3.5 h-3.5" /> Video
                                </button>
                                <button
                                    onClick={() => setFormat('mp3')}
                                    className={`flex items-center gap-3 px-8 h-12 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${format === 'mp3' ? 'bg-white shadow-xl text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Music className="w-3.5 h-3.5" /> Audio
                                </button>
                            </div>
                        </div>

                        {/* Quality Select */}
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quality Protocol</p>
                            <div className="relative group/select">
                                <select
                                    className="w-full h-16 rounded-full bg-slate-50 border-none px-8 font-bold text-slate-900 appearance-none cursor-pointer focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                    value={quality}
                                    onChange={(e) => setQuality(e.target.value)}
                                    disabled={format === 'mp3'}
                                >
                                    <option value="1080">1080p Ultra-HD</option>
                                    <option value="720">720p Optimized</option>
                                    <option value="480">480p Fast Transfer</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                    <Layers className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fiscal Real-time Stats */}
                    <div className="p-8 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-3xl rounded-full" />

                        <div className="flex items-center gap-10">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Volume</p>
                                <p className="text-3xl font-black italic">{urlCount} <span className="text-xs text-slate-500 uppercase not-italic ml-1">Clips</span></p>
                            </div>
                            <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Acquisition Cost</p>
                                <p className="text-3xl font-black italic text-blue-400">{creditCost} <span className="text-xs text-slate-500 uppercase not-italic ml-1">Credits</span></p>
                            </div>
                        </div>

                        <div className="w-full md:w-auto p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center md:items-end">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Your Network Balance</p>
                            <div className="flex items-center gap-2">
                                <span className={`text-2xl font-black italic ${(userCredits ?? 0) < creditCost ? 'text-red-400' : 'text-white'}`}>
                                    {userCredits !== null ? userCredits : "---"}
                                </span>
                                <Coins className="w-4 h-4 text-amber-500 shadow-lg shadow-amber-500/20" />
                            </div>
                        </div>
                    </div>

                    {/* Operational Error */}
                    {error && (
                        <Alert variant="destructive" className="rounded-3xl bg-red-50 border-red-100 border text-red-600 p-8">
                            <AlertCircle className="h-6 w-6 shrink-0" />
                            <div className="ml-3">
                                <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">System Error</AlertTitle>
                                <AlertDescription className="font-bold">{error}</AlertDescription>
                            </div>
                        </Alert>
                    )}

                    {/* Primary Command Button */}
                    <Button
                        className={`w-full h-20 rounded-[2.5rem] bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/40 transition-all active:scale-[0.98] group relative overflow-hidden ${isLoading || urlCount === 0 || isMixedPlatform || (userCredits ?? 0) < creditCost ? 'opacity-50 grayscale' : ''}`}
                        onClick={handleStartDownload}
                        disabled={isLoading || urlCount === 0 || isMixedPlatform || (userCredits !== null && userCredits < creditCost)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

                        {isLoading ? (
                            <div className="flex items-center gap-4">
                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                <span className="text-sm font-black uppercase tracking-[0.2em]">Synchronizing Cloud Nodes...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-sm font-black uppercase tracking-[0.2em]">Establish Acquisition Sequence</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </div>
                        )}
                    </Button>

                    {!user && (
                        <div className="text-center space-y-4 pt-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Authorization Token Required</p>
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl border-2 border-blue-600/20 hover:border-blue-600 hover:bg-white text-blue-600 font-black uppercase text-[10px] tracking-widest"
                                onClick={() => login()}
                            >
                                Secure Entry Login
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
