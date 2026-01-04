
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BulkProgress } from "@/components/download/bulk-progress";
import { BulkDownloader } from "@/components/download/bulk-downloader";
import CreditPurchaseCalculator from "@/components/content/credit-purchase-calculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
    Download,
    History,
    User,
    CreditCard,
    Coins,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    ArrowUpRight,
    Zap,
    Crown,
    LayoutDashboard,
    Plus,
    Slash,
    Settings,
    ShieldCheck,
    Trash2,
    Loader2
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

interface JobRecord {
    id: string;
    created_at: string;
    status: string;
    total_files: number;
    completed_files: number;
    quality_preference: string;
    format_preference: string;
    platform: string;
}

interface UserProfile {
    credits: number;
    subscription_plan: string;
    subscription_status: string;
    created_at: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
}

function DashboardContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    // States
    const [activeTab, setActiveTab] = useState("overview");
    const [activeJobIds, setActiveJobIds] = useState<string[]>([]);
    const [history, setHistory] = useState<JobRecord[]>([]);
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

    // Sync formData with profile when profile loads
    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                phone: profile.phone || '',
                email: profile.email || user?.email || ''
            });
        }
    }, [profile, user]);

    // Fetch payments when payments tab is active
    useEffect(() => {
        if (activeTab === 'payments' && user) {
            fetch(`/api/user/payments?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.payments) setPurchaseHistory(data.payments);
                })
                .catch(err => console.error("Failed to fetch payments", err));
        }
    }, [activeTab, user]);
    const [isLoading, setIsLoading] = useState(true);
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    // 1. Sync Tabs with URL
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && ["overview", "history", "subscription", "payments", "settings"].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // 2. Handle activeJobIds persistence
    useEffect(() => {
        const queryJobId = searchParams.get("jobId");
        const savedJobsStr = localStorage.getItem('fsmvid_active_jobs');
        let currentJobs: string[] = [];

        if (savedJobsStr) {
            try {
                currentJobs = JSON.parse(savedJobsStr);
            } catch (e) {
                currentJobs = [];
            }
        }

        if (queryJobId && !currentJobs.includes(queryJobId)) {
            const updatedJobs = [queryJobId, ...currentJobs];
            setActiveJobIds(updatedJobs);
            localStorage.setItem('fsmvid_active_jobs', JSON.stringify(updatedJobs));

            // Clean URL to prevent re-adding on refresh
            const params = new URLSearchParams(window.location.search);
            params.delete('jobId');
            const newUrl = params.toString() ? `/dashboard?${params.toString()}` : '/dashboard';
            router.replace(newUrl);
        } else if (currentJobs.length > 0) {
            setActiveJobIds(currentJobs);
        }
    }, [searchParams]);

    // 3. Fetch Real Data via Server API (Bypasses Client-side Supabase Config issues)
    const fetchData = async () => {
        if (!user) return;

        try {
            const res = await fetch(`/api/user/dashboard?userId=${user.id}`);
            if (!res.ok) throw new Error("Failed to sync with network nodes");

            const data = await res.json();
            setProfile(data.profile);
            setHistory(data.history || []);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            // Don't toast on background refresh
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Background sync every 15 seconds
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, [user, activeJobIds]);

    // History Deletion Handlers
    const toggleJob = (id: string) => {
        setSelectedJobs(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedJobs.length === history.length) {
            setSelectedJobs([]);
        } else {
            setSelectedJobs(history.map(job => job.id));
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedJobs.length === 0 || !user) return;

        setIsDeleting(true);
        try {
            const res = await fetch('/api/user/history/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobIds: selectedJobs, userId: user.id })
            });

            if (!res.ok) throw new Error("Failed to delete items");

            toast({
                title: "Defragmentation Complete",
                description: `Successfully removed ${selectedJobs.length} archive entries.`,
            });

            setSelectedJobs([]);
            fetchData(); // Refresh list immediately
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: "Could not purge selected records.",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <AlertCircle className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-3xl font-black mb-2 tracking-tight">Access Denied</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">Please identify yourself to access the private dashboard area.</p>
                <Button size="lg" className="rounded-2xl px-12" onClick={() => window.location.href = '/'}>Go Home</Button>
            </div>
        );
    }

    const clearActiveJob = (id: string) => {
        const updated = activeJobIds.filter(jobId => jobId !== id);
        setActiveJobIds(updated);
        localStorage.setItem('fsmvid_active_jobs', JSON.stringify(updated));
    };

    const clearAllActiveJobs = () => {
        setActiveJobIds([]);
        localStorage.removeItem('fsmvid_active_jobs');
    };

    const handleSyncProfile = async () => {
        if (!user) return;

        try {
            const res = await fetch('/api/user/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    ...formData
                })
            });

            if (!res.ok) throw new Error("Update failed");

            toast({
                title: "Identity Synced",
                description: "Your network signature has been updated successfully.",
            });
            fetchData(); // Refresh data to confirm sync
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Sync Failed",
                description: "Could not update network signature. Please try again.",
            });
        }
    };

    const handleCredentialChange = () => {
        toast({
            title: "Security Uplink Required",
            description: "Please check your email to verify credential rotation.",
        });
    };

    return (
        <div className="container mx-auto px-6 pt-48 pb-12 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 relative min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
            {/* Global Atmospheric Depth */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/[0.03] blur-[150px] rounded-full animate-slow-spin" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-600/[0.03] blur-[150px] rounded-full animate-slow-spin-reverse" />
            </div>
            {/* Header Hero */}
            <div className="relative mb-12 p-10 rounded-[4rem] bg-slate-950 overflow-hidden shadow-3xl border border-white/5">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                                <LayoutDashboard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">Bulk Video Downloader Terminal</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-white mb-2 italic">
                            Welcome, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent capitalize">{profile?.first_name || user.email.split('@')[0]}</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-lg">
                            Your personal hub for bulk video downloader operations, batch automation, and account management.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm hover:bg-white/[0.05] transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all rounded-full" />
                            <div className="bg-blue-500/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                                <Coins className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Total Balance</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-white">{profile?.credits ?? '---'}</span>
                                    <span className="text-xs text-blue-400 font-bold uppercase">vCredits</span>
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => {
                            setActiveTab("subscription");
                            setTimeout(() => {
                                document.getElementById('pay-as-you-go')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }} className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all">
                            Add Power <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
                <TabsList className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-2 rounded-[3rem] h-16 border border-slate-200 dark:border-slate-800 shadow-xl inline-flex sticky top-24 z-40 w-full md:w-auto overflow-x-auto justify-start">
                    <TabsTrigger value="overview" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Overview</TabsTrigger>
                    <TabsTrigger value="bulk" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Bulk Downloader</TabsTrigger>
                    <TabsTrigger value="history" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Download History</TabsTrigger>
                    <TabsTrigger value="subscription" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Buy Credit</TabsTrigger>
                    <TabsTrigger value="payments" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Payment History</TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-[2rem] px-10 h-13 data-[state=active]:bg-white data-[state=active]:shadow-lg font-black text-[10px] uppercase tracking-widest text-slate-500 data-[state=active]:text-blue-600">Settings</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
                    {activeJobIds.length > 0 ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1 font-black text-[10px] uppercase tracking-[0.2em]">Active Cluster</Badge>
                                    <span className="text-sm font-bold text-slate-500">{activeJobIds.length} Nodes Online</span>
                                </div>
                                <Button variant="ghost" onClick={clearAllActiveJobs} className="text-slate-400 hover:text-red-500 font-black text-[10px] uppercase tracking-widest h-8 px-4 rounded-xl hover:bg-slate-50">
                                    Dismiss All
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                                {activeJobIds.map(id => (
                                    <Card key={id} className="border-none shadow-[0_32px_64px_-16px_rgba(37,99,235,0.1)] rounded-[3rem] overflow-hidden bg-white ring-1 ring-slate-100 group">
                                        <CardHeader className="p-8 pb-0 flex flex-row justify-between items-center">
                                            <CardTitle className="text-xl font-black tracking-tighter italic">Batch Process <span className="text-blue-600 opacity-50 text-xs ml-2">#{id.substring(0, 8)}</span></CardTitle>
                                            <Button variant="ghost" onClick={() => clearActiveJob(id)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full h-8 w-8 p-0">
                                                <XCircle className="w-5 h-5" />
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <BulkProgress
                                                jobId={id}
                                                onComplete={() => {
                                                    fetchData(); // Refresh history
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Card className="border-none bg-slate-50/50 rounded-[3.5rem] overflow-hidden hover:bg-white transition-all duration-500 group border-2 border-dashed border-slate-200 hover:border-blue-500/50">
                            <CardContent className="py-24 flex flex-col items-center text-center px-10">
                                <div className="relative mb-8">
                                    <div className="absolute inset-x-0 bottom-0 h-4 bg-blue-600/20 blur-xl scale-150 rotate-[-10deg] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    <div className="relative bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:translate-y-[-10px] transition-all duration-500">
                                        <Zap className="w-12 h-12 text-blue-600 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black tracking-tighter mb-4">Start <span className="text-blue-600">Bulk Video Download</span></h3>
                                <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 font-medium text-balance">
                                    Our bulk video downloader workers are ready to process your links. Start a new batch!
                                </p>
                                <Button onClick={() => setActiveTab("bulk")} className="rounded-full h-12 px-12 text-[10px] font-black uppercase tracking-[0.15em] bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]">
                                    Launch Bulk Download <Plus className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Profile Info Card */}
                        <Card className="lg:col-span-1 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white group hover:translate-y-[-5px] transition-all">
                            <CardHeader className="p-10 pb-4">
                                <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tighter uppercase italic">
                                    <User className="w-6 h-6 text-blue-600" /> Account ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-10 pt-4 space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Authenticated Email</p>
                                    <p className="font-bold text-slate-900 truncate">{profile?.email || user.email}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Member Tier</p>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-blue-600 text-white border-none px-3 font-black text-[10px] uppercase tracking-widest">{profile?.subscription_plan ?? 'Free'}</Badge>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Permanent Node</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Network Enrollment</p>
                                    <p className="font-bold text-slate-900">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString([], { dateStyle: 'long' }) : 'Syncing...'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent History Preview */}
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white group">
                            <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tighter uppercase italic">
                                    <History className="w-6 h-6 text-indigo-600" /> Recent Bulk Video Downloads
                                </CardTitle>
                                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 rounded-xl px-6 h-10 text-slate-400 hover:text-indigo-600" onClick={() => setActiveTab("history")}>
                                    View Logic
                                </Button>
                            </CardHeader>
                            <CardContent className="p-10 pt-4">
                                {history.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {history.slice(0, 4).map((job) => (
                                            <div key={job.id}
                                                className={`group/item flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer ${activeJobIds.includes(job.id) ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl scale-[1.02]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-2xl hover:border-blue-50'}`}
                                                onClick={() => {
                                                    if (!activeJobIds.includes(job.id)) {
                                                        const updated = [job.id, ...activeJobIds];
                                                        setActiveJobIds(updated);
                                                        localStorage.setItem('fsmvid_active_jobs', JSON.stringify(updated));
                                                    }
                                                    setActiveTab("overview");
                                                }}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-2xl ${activeJobIds.includes(job.id) ? 'bg-white/20' : 'bg-white shadow-sm border border-slate-100'}`}>
                                                        {job.status === 'completed' ? <CheckCircle2 className={`w-5 h-5 ${activeJobIds.includes(job.id) ? 'text-white' : 'text-green-500'}`} /> :
                                                            job.status === 'failed' ? <XCircle className={`w-5 h-5 ${activeJobIds.includes(job.id) ? 'text-white' : 'text-red-500'}`} /> :
                                                                <Clock className={`w-5 h-5 ${activeJobIds.includes(job.id) ? 'text-white' : 'text-indigo-500'} animate-spin-slow`} />}
                                                    </div>
                                                    <div>
                                                        <p className={`font-black text-[10px] uppercase tracking-tighter ${activeJobIds.includes(job.id) ? 'text-indigo-100' : 'text-slate-400'}`}>{job.platform || 'General'}</p>
                                                        <p className="text-sm font-bold">{job.completed_files}/{job.total_files} Units</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge variant="outline" className={`text-[9px] h-5 px-2 font-black uppercase tracking-widest ${activeJobIds.includes(job.id) ? 'border-white/20 text-white' : 'border-slate-200 text-slate-500'}`}>{job.quality_preference}</Badge>
                                                    <p className={`text-[10px] font-bold mt-1 ${activeJobIds.includes(job.id) ? 'text-indigo-100' : 'text-slate-400'}`}>{new Date(job.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                                        <History className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Archive Void</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* BULK ENGINE TAB */}
                <TabsContent value="bulk" className="animate-in slide-in-from-right-8 duration-700">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl font-black tracking-tighter italic"><span className="text-blue-600">Bulk Video Downloader</span></h2>
                            <p className="text-slate-400 font-medium max-w-lg mx-auto">Initialize high-performance bulk video downloader batch sequences for multi-platform video acquisition.</p>
                        </div>

                        {((profile?.credits ?? 0) > 0) ? (
                            <BulkDownloader />
                        ) : (
                            <Card className="border-none shadow-2xl rounded-[3.5rem] bg-slate-900 text-white overflow-hidden p-16 text-center relative group">
                                <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full scale-150 group-hover:bg-blue-600/20 transition-all duration-700" />
                                <div className="relative z-10">
                                    <div className="bg-blue-600 p-6 rounded-3xl w-fit mx-auto mb-8 shadow-xl">
                                        <ShieldCheck className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tighter italic uppercase mb-4">Priority Authorization Required</h3>
                                    <p className="text-slate-400 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                                        Your processing power has been <span className="text-white">completely exhausted</span>. Upgrade your node cluster to refill your vCredits and re-enable high-performance batch sequences.
                                    </p>
                                    <Button
                                        onClick={() => setActiveTab("subscription")}
                                        className="h-16 px-12 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all"
                                    >
                                        Obtain Priority Authorization
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                {/* HISTORY TAB */}
                <TabsContent value="history" className="animate-in slide-in-from-right-8 duration-700">
                    <Card className="border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white">
                        <CardHeader className="p-12 border-b border-slate-50 bg-slate-50/30">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <CardTitle className="text-4xl font-black tracking-tighter mb-2 italic">Operation Archive</CardTitle>
                                    <CardDescription className="text-slate-500 text-lg font-medium">A persistent record of your entire bulk video downloader history.</CardDescription>
                                </div>
                                {history.length > 0 && (
                                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="flex items-center gap-2 px-4">
                                            <Checkbox
                                                id="select-all"
                                                checked={selectedJobs.length === history.length && history.length > 0}
                                                onCheckedChange={toggleAll}
                                            />
                                            <label htmlFor="select-all" className="text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer select-none">Select All</label>
                                        </div>
                                        {selectedJobs.length > 0 && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="rounded-xl h-9 px-4 font-black text-[10px] uppercase tracking-widest"
                                                onClick={handleDeleteSelected}
                                                disabled={isDeleting}
                                            >
                                                <Trash2 className="w-3.5 h-3.5 mr-2" />
                                                Delete ({selectedJobs.length})
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            {history.length > 0 ? (
                                <div className="space-y-4">
                                    {history.map((job) => (
                                        <div key={job.id}
                                            className={`flex flex-col md:flex-row md:items-center p-6 rounded-[2rem] bg-white border hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] transition-all group cursor-pointer ${selectedJobs.includes(job.id) ? 'border-blue-400 bg-blue-50/10' : 'border-slate-100 hover:border-blue-100'}`}
                                            onClick={() => {
                                                if (!activeJobIds.includes(job.id)) {
                                                    const updated = [job.id, ...activeJobIds];
                                                    setActiveJobIds(updated);
                                                    localStorage.setItem('fsmvid_active_jobs', JSON.stringify(updated));
                                                }
                                                setActiveTab("overview");
                                            }}
                                        >
                                            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0 flex-grow">
                                                <div
                                                    className="p-2"
                                                    onClick={(e) => { e.stopPropagation(); toggleJob(job.id); }}
                                                >
                                                    <Checkbox checked={selectedJobs.includes(job.id)} />
                                                </div>

                                                <div className={`shrink-0 h-16 w-16 rounded-3xl flex items-center justify-center text-white relative group-hover:rotate-6 transition-transform shadow-xl ${job.status === 'completed' ? 'bg-green-600 shadow-green-500/20' : job.status === 'failed' ? 'bg-red-600 shadow-red-500/20' : 'bg-slate-900 shadow-slate-900/20'}`}>
                                                    <Download className="w-7 h-7" />
                                                    {job.status === 'processing' && (
                                                        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center">
                                                            <div className="h-2 w-2 bg-white rounded-full animate-[ping_1.5s_infinite]" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <p className="font-black text-xl tracking-tighter uppercase italic text-slate-900">{job.platform || 'General'}</p>
                                                        <Badge variant="outline" className="text-[10px] h-5 border-slate-200 font-black uppercase px-2 tracking-widest">{job.quality_preference} {job.format_preference.toUpperCase()}</Badge>
                                                    </div>
                                                    <p className="text-sm text-slate-400 font-medium truncate">{new Date(job.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 md:pl-6 md:border-l md:border-slate-50 ml-12 md:ml-0">
                                                <div className="text-right hidden md:block">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Operational Result</p>
                                                    <p className="text-lg font-black text-slate-900 tracking-tighter">{job.completed_files} / {job.total_files} Units</p>
                                                </div>
                                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${job.status === 'completed' ? 'bg-green-50 text-green-600' : job.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {job.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : job.status === 'failed' ? <XCircle className="w-6 h-6" /> : <Clock className="w-6 h-6 animate-spin-slow" />}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-slate-50/50 rounded-[3.5rem] border-2 border-dashed border-slate-100 animate-in fade-in duration-1000">
                                    <div className="bg-white p-8 rounded-full shadow-xl w-fit mx-auto mb-6">
                                        <History className="w-12 h-12 text-slate-200" />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter mb-2 italic">Archive Void</h3>
                                    <p className="text-slate-400 font-medium max-w-xs mx-auto">Your operational history will be archived here once you initiate bulk video downloader sequences.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SUBSCRIPTION TAB */}
                <TabsContent value="subscription" className="animate-in slide-in-from-left-8 duration-700">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-5xl font-black tracking-tighter italic uppercase">Bulk <span className="text-blue-600">Download Power Grid</span></h2>
                        <p className="text-slate-500 font-medium">Elevate your processing capabilities with high-priority access levels.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Basic Saver", credits: 5, price: "Free", desc: "Standard priority processing for occasional batching.", icon: ShieldCheck, buttonText: "Start Free" },
                            { name: "Bulk Pro", credits: 300, price: "$9.99", desc: "High-priority nodes with 4K support and ZIP hosting.", icon: Zap, featured: true, buttonText: "Get Bulk Pro" },
                            { name: "Archive Elite", credits: 1000, price: "$19.99", desc: "Industrial-grade speed for permanent archival tasks.", icon: Crown, buttonText: "Get Ultimate" }
                        ].map((plan, i) => (
                            <Card key={i} className={`p-10 border-none shadow-2xl rounded-[3rem] overflow-hidden transition-all duration-500 hover:translate-y-[-10px] ${plan.featured ? 'bg-slate-900 text-white ring-4 ring-blue-600/20' : 'bg-white text-slate-900 border border-slate-100'}`}>
                                <div className={`p-4 rounded-2xl w-fit mb-8 ${plan.featured ? 'bg-blue-600' : 'bg-blue-50'}`}>
                                    <plan.icon className={`w-8 h-8 ${plan.featured ? 'text-white' : 'text-blue-600'}`} />
                                </div>
                                <h3 className="text-2xl font-black italic mb-2 uppercase">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-black tracking-tighter">{plan.credits}</span>
                                    <span className="text-xs font-bold opacity-50 ml-2 uppercase">vCredits</span>
                                </div>
                                <p className={`mb-8 font-medium text-sm leading-relaxed ${plan.featured ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-baseline justify-between mb-8">
                                        <p className="text-sm font-bold opacity-60 uppercase tracking-widest text-[10px]">Access Cost</p>
                                        <p className="text-2xl font-black italic">{plan.price}</p>
                                    </div>
                                    <Button asChild className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] ${plan.featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`} disabled={plan.price === "Free"}>
                                        <Link href={plan.price === "Free" ? "#" : `/payment/manual?plan=${encodeURIComponent(plan.name.toLowerCase())}`}>
                                            {plan.buttonText}
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div id="pay-as-you-go" className="mt-20">
                        <CreditPurchaseCalculator authenticated={true} />
                    </div>

                </TabsContent>

                {/* PAYMENTS TAB */}
                <TabsContent value="payments" className="animate-in slide-in-from-right-8 duration-700">
                    <div className="mt-8 space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter italic uppercase text-slate-900">Financial <span className="text-blue-600">Archives</span></h3>
                                <p className="text-slate-500 font-medium text-sm">Record of manual credit acquisitions and power upgrades.</p>
                            </div>
                        </div>

                        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white ring-1 ring-slate-100">
                            <CardContent className="p-0">
                                {purchaseHistory.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date Timestamp</th>
                                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Package Identity</th>
                                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Fiscal Value</th>
                                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Verification Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {purchaseHistory.map((payment: any) => (
                                                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="p-6 font-bold text-slate-600 text-xs">
                                                            {new Date(payment.created_at).toLocaleDateString([], { dateStyle: 'medium' })}
                                                            <span className="block text-[9px] text-slate-400 bg-slate-100 w-fit px-2 py-0.5 rounded-full mt-1 font-mono">{new Date(payment.created_at).toLocaleTimeString([], { timeStyle: 'short' })}</span>
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="font-black text-slate-900 text-sm italic uppercase">{payment.plan_id}</div>
                                                            <div className="text-[10px] font-mono text-slate-400 mt-1 max-w-[150px] truncate" title={payment.tx_hash}>TX: {payment.tx_hash}</div>
                                                        </td>
                                                        <td className="p-6">
                                                            <span className="font-black text-slate-900">${payment.amount}</span>
                                                        </td>
                                                        <td className="p-6 text-right">
                                                            {payment.status === 'pending' ? (
                                                                <Badge className="bg-amber-100 text-amber-600 border-none font-black text-[9px] uppercase tracking-widest shadow-sm">
                                                                    Processing
                                                                </Badge>
                                                            ) : payment.status === 'approved' ? (
                                                                <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest shadow-sm">
                                                                    CONFIRMED
                                                                </Badge>
                                                            ) : (
                                                                <Badge className="bg-red-100 text-red-600 border-none font-black text-[9px] uppercase tracking-widest shadow-sm">
                                                                    FAILED
                                                                </Badge>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="py-20 text-center">
                                        <p className="text-slate-400 font-medium italic text-sm">No transaction history found on the ledger.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* SETTINGS TAB */}
                <TabsContent value="settings" className="animate-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3.5rem] overflow-hidden bg-white">
                            <CardHeader className="p-12 border-b border-slate-50">
                                <CardTitle className="text-4xl font-black tracking-tighter italic text-slate-900">Profile Identity</CardTitle>
                                <CardDescription className="text-slate-500 text-lg font-medium">Update your network signature and contact protocols.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</p>
                                        <input
                                            className="w-full h-16 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border-none px-8 font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                            placeholder="e.g. John"
                                            value={formData.first_name}
                                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</p>
                                        <input
                                            className="w-full h-16 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border-none px-8 font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                            placeholder="e.g. Doe"
                                            value={formData.last_name}
                                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Comm Signal (Phone)</p>
                                        <input
                                            className="w-full h-16 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border-none px-8 font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Network Enrollment</p>
                                        <input className="w-full h-16 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border-none px-8 font-bold text-slate-400/50 opacity-50 cursor-not-allowed uppercase text-[10px] tracking-widest" value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Syncing...'} disabled />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Authenticated Email</p>
                                    <input
                                        className="w-full h-16 rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10 border-none px-8 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <Button onClick={handleSyncProfile} className="w-full sm:w-fit rounded-full h-12 px-12 bg-slate-950 dark:bg-white dark:text-slate-950 hover:bg-black text-white font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-[0.98] transition-all">
                                    Sync Profile Settings <ArrowUpRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="lg:col-span-1 space-y-10">
                            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-slate-950 text-white relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full" />
                                <CardHeader className="p-10 pb-4 relative z-10">
                                    <CardTitle className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-blue-400 shadow-glow" /> Key Security
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 pt-4 space-y-6 relative z-10">
                                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Two-Factor Auth</p>
                                            <span className="text-sm font-bold block">{tfaEnabled ? 'Shield Active' : 'Shield Inactive'}</span>
                                        </div>
                                        <Switch checked={tfaEnabled} onCheckedChange={setTfaEnabled} />
                                    </div>
                                    <Button onClick={handleCredentialChange} variant="outline" className="w-full h-14 rounded-[1.5rem] border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest text-white mt-4 active:scale-95 transition-all">
                                        Change Credentials
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white border border-red-50 group hover:border-red-200 transition-all">
                                <CardHeader className="p-10 pb-4">
                                    <CardTitle className="text-xl font-black italic tracking-tighter uppercase text-red-600">Danger Sector</CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 pt-4">
                                    <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">Permanently terminate your network identity and purge all operational logs. This action is final.</p>
                                    <Button variant="outline" className="w-full h-14 rounded-[1.5rem] border-red-100 text-red-600 hover:bg-red-50 hover:border-red-300 text-[10px] font-black uppercase tracking-widest transition-all">Wipe Identity</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
