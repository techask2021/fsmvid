
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    Users,
    CreditCard,
    Activity,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Plus,
    Edit,
    RefreshCcw,
    Zap,
    DollarSign,
    Box,
    ExternalLink,
    Filter,
    HardDrive,
    Server,
    Globe
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/use-toast";

interface StatData {
    totalUsers: number;
    pendingPayments: number;
    totalJobs: number;
    systemCredits: number;
}

const getCreditsFromPlan = (planId: string): number => {
    if (!planId) return 0;
    const lowerPlan = planId.toLowerCase();

    // Standard Plans
    if (lowerPlan === 'basic node' || lowerPlan === 'basic saver') return 50;
    if (lowerPlan === 'pro operator') return 150;
    if (lowerPlan === 'bulk pro') return 300;
    if (lowerPlan === 'master commander') return 500;
    if (lowerPlan === 'archive elite') return 1000;

    // Custom Regex Parsing for "Custom Pack (15810 Cr)"
    const match = planId.match(/\((\d+)\s*Cr\)/i);
    if (match && match[1]) {
        return parseInt(match[1]);
    }

    return 0;
};

export default function AdminDashboard() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [stats, setStats] = useState<StatData | null>(null);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [sRes, uRes, pRes] = await Promise.all([
                fetch('/api/admin/stats'),
                fetch('/api/admin/users'),
                fetch('/api/admin/payments')
            ]);

            const sData = await sRes.json();
            const uData = await uRes.json();
            const pData = await pRes.json();

            setStats(sData.stats);
            setUsersList(uData.users || []);
            setPayments(pData.payments || []);
        } catch (err) {
            console.error("Admin fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchAllData();
        }
    }, [user]);

    const handleAction = async (endpoint: string, body: any) => {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                toast({ title: "Operation Authority", description: "Remote command executed successfully." });
                fetchAllData();
            } else {
                throw new Error("Failed");
            }
        } catch (err) {
            toast({ title: "Command Error", description: "Signal lost or permission denied.", variant: "destructive" });
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="container mx-auto py-40 text-center animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-1 ring-red-500/20">
                    <ShieldCheck className="w-12 h-12 text-red-500 opacity-50" />
                </div>
                <h1 className="text-4xl font-black mb-3 tracking-tighter italic">Sector <span className="text-red-500 underline decoration-red-500/30">Restricted</span></h1>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">This terminal is bound to Administrative Clearance Level 4. Please retreat.</p>
                <Button size="lg" className="rounded-2xl px-12 bg-slate-900 border-none hover:bg-slate-800" onClick={() => window.location.href = '/'}>Egress to Surface</Button>
            </div>
        );
    }

    const filteredUsers = usersList.filter(u =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.includes(searchTerm)
    );

    return (
        <div className="container mx-auto px-6 pt-48 pb-20 max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000 bg-slate-50/50 dark:bg-slate-950/50 min-h-screen">
            {/* Ultra Header */}
            <div className="relative mb-14 p-12 rounded-[4rem] bg-slate-950 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Badge className="bg-blue-600 text-white border-none font-black px-4 py-1 text-[10px] uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(37,99,235,0.4)]">Master Terminal v2.1</Badge>
                            <div className="flex gap-2">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global Sync Active</span>
                            </div>
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter text-white mb-3 italic leading-none">Command <span className="text-blue-500">Center</span></h1>
                        <p className="text-slate-400 font-medium max-w-md text-sm">Managing the digital heart of FSMVID. Real-time monitoring of finance, compute nodes, and user flows.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                        <Button
                            variant="outline"
                            className="bg-white/[0.03] border-white/10 text-white hover:bg-white/10 rounded-full h-12 px-8 font-black text-[10px] uppercase tracking-widest backdrop-blur-xl transition-all active:scale-[0.98]"
                            onClick={fetchAllData}
                        >
                            <RefreshCcw className="w-4 h-4 mr-3 animate-spin-slow" /> Re-Scan Network
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full h-12 px-10 font-black uppercase text-[10px] tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all">
                            Export Ledger
                        </Button>
                    </div>
                </div>

                {/* Micro Stats Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-white/[0.02] border-t border-white/[0.05] p-6 hidden lg:flex items-center justify-around">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <HardDrive className="w-3 h-3 text-blue-500" /> Storage: 84% Available
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Server className="w-3 h-3 text-indigo-500" /> Nodes: 16 Online
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Globe className="w-3 h-3 text-emerald-500" /> Latency: 22ms
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
                {[
                    { label: 'Citizen Base', value: stats?.totalUsers, icon: Users, color: 'blue', desc: 'Active Registered Users' },
                    { label: 'Credit Volume', value: stats?.systemCredits, icon: Zap, color: 'yellow', desc: 'Total vCredits Circulating' },
                    { label: 'Job Throughput', value: stats?.totalJobs, icon: Activity, color: 'indigo', desc: 'Total Batches Processed' },
                    { label: 'Pending Ledger', value: stats?.pendingPayments, icon: CreditCard, color: 'red', desc: 'Awaiting Verification' },
                ].map((stat) => (
                    <Card key={stat.label} className="border-none shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-[3rem] overflow-hidden group relative bg-white ring-1 ring-slate-100">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full`} />
                        <CardContent className="p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className={`p-5 rounded-[2rem] bg-${stat.color === 'yellow' ? 'amber' : stat.color}-500/10 group-hover:scale-110 transition-transform duration-500`}>
                                    <stat.icon className={`w-8 h-8 text-${stat.color === 'yellow' ? 'amber' : stat.color}-500`} />
                                </div>
                                <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                    <Plus className="w-3 h-3 text-slate-300" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black mt-1 tracking-tighter leading-none italic">{isLoading ? '---' : stat.value}</h3>
                            <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mt-3">{stat.label}</p>
                            <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tight">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="payments" className="space-y-12">
                <TabsList className="bg-slate-100/50 backdrop-blur-sm p-2 rounded-[3rem] h-20 border border-slate-200/50 shadow-sm inline-flex w-full md:w-auto overflow-x-auto justify-start">
                    <TabsTrigger value="payments" className="rounded-[2.5rem] px-12 h-16 data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all">Finance Queue</TabsTrigger>
                    <TabsTrigger value="users" className="rounded-[2.5rem] px-12 h-16 data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all">User Directory</TabsTrigger>
                </TabsList>

                <TabsContent value="payments" className="animate-in slide-in-from-bottom-12 duration-700">
                    <Card className="border-none shadow-3xl rounded-[4rem] overflow-hidden bg-white ring-1 ring-slate-100">
                        <CardHeader className="p-12 bg-slate-50/30 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <CardTitle className="text-4xl font-black tracking-tighter italic">Fiscal Ledger</CardTitle>
                                <CardDescription className="text-slate-500 font-medium text-lg mt-2">Verify manual transaction proof and inject network power.</CardDescription>
                            </div>
                            <Button variant="outline" className="rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-[0.1em] h-12 px-6">
                                <Filter className="w-4 h-4 mr-3" /> All Statuses
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {payments.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Account Identity</th>
                                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Ledger Entry (TX)</th>
                                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Fiscal Value</th>
                                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Node Status</th>
                                                <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Command</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {payments.map((p) => (
                                                <tr key={p.id} className="hover:bg-slate-50/80 transition-all group/row">
                                                    <td className="p-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center text-blue-500 font-black text-xs shadow-lg">
                                                                {p.users?.email?.[0].toUpperCase() || '?'}
                                                            </div>
                                                            <div>
                                                                <div className="font-black text-slate-900 tracking-tight text-lg">{p.users?.email || 'Unauthorized'}</div>
                                                                <div className="text-[10px] text-slate-400 font-mono tracking-tighter opacity-50">{p.user_id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="font-mono text-xs bg-slate-100 p-3 rounded-2xl break-all max-w-[200px] border border-slate-200/50 text-slate-600 group-hover/row:bg-white transition-all cursor-help relative group" title={p.tx_hash}>
                                                                {p.tx_hash.substring(0, 12)}...{p.tx_hash.substring(p.tx_hash.length - 8)}
                                                                <ExternalLink className="absolute top-2 right-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                            <div className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">{p.provider || 'BLOCKCHAIN'} PAY</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        <div className="font-black text-slate-900 text-2xl tracking-tighter">${p.amount}</div>
                                                        <Badge variant="outline" className="text-[10px] h-auto py-1 border-blue-100 text-blue-600 font-black uppercase px-2 mt-1 bg-blue-50/50 whitespace-normal text-center">
                                                            {p.plan_id}
                                                        </Badge>
                                                        <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                                            {getCreditsFromPlan(p.plan_id)} Credits
                                                        </div>
                                                    </td>
                                                    <td className="p-8">
                                                        {p.status === 'pending' ? (
                                                            <Badge className="bg-amber-100 text-amber-600 border-none font-black text-[10px] uppercase h-7 px-4 tracking-[0.1em] shadow-sm animate-pulse-slow">
                                                                <Clock className="w-3 h-3 mr-2" /> Verification
                                                            </Badge>
                                                        ) : p.status === 'approved' ? (
                                                            <Badge className="bg-emerald-100 text-emerald-600 border-none font-black text-[10px] uppercase h-7 px-4 tracking-[0.1em] shadow-sm">
                                                                <CheckCircle2 className="w-3 h-3 mr-2" /> Finalized
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-red-100 text-red-600 border-none font-black text-[10px] uppercase h-7 px-4 tracking-[0.1em] shadow-sm">
                                                                <XCircle className="w-3 h-3 mr-2" /> Discarded
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="p-8 text-right">
                                                        {p.status === 'pending' && (
                                                            <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all duration-300">
                                                                <Button
                                                                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full h-11 px-8 font-black uppercase text-[10px] tracking-[0.15em] shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                                                                    onClick={() => {
                                                                        const credits = getCreditsFromPlan(p.plan_id);
                                                                        if (confirm(`Approve adding ${credits} credits to ${p.users?.email}?`)) {
                                                                            handleAction('/api/admin/payments', {
                                                                                orderId: p.id,
                                                                                action: 'approve',
                                                                                creditsToAdd: credits
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    Release Power
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    className="border-red-200 text-red-600 hover:bg-white rounded-full h-11 px-8 font-black uppercase text-[10px] tracking-[0.15em] bg-white shadow-sm active:scale-[0.98]"
                                                                    onClick={() => {
                                                                        if (confirm("Reject this transaction?")) {
                                                                            handleAction('/api/admin/payments', {
                                                                                orderId: p.id,
                                                                                action: 'reject'
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    Reject Entry
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="py-40 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                                        <Box className="w-10 h-10 text-slate-200" />
                                    </div>
                                    <p className="font-black uppercase text-xs tracking-[0.4em] text-slate-300">Finance Queue: Depleted</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="animate-in slide-in-from-right-12 duration-700">
                    <Card className="border-none shadow-3xl rounded-[4rem] overflow-hidden bg-white ring-1 ring-slate-100">
                        <CardHeader className="p-12 bg-slate-50/30 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-10">
                            <div>
                                <CardTitle className="text-4xl font-black tracking-tighter italic whitespace-nowrap">Global Registry</CardTitle>
                                <CardDescription className="text-slate-500 font-medium text-lg mt-2">Manage citizen balances and network access tiers.</CardDescription>
                            </div>
                            <div className="relative w-full md:w-[450px]">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    className="pl-16 h-18 text-lg rounded-[2.5rem] bg-white border-slate-200 focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 shadow-xl transition-all font-medium py-8"
                                    placeholder="Scan identity signatures (Email/UUID)..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                    <Badge className="bg-slate-100 text-slate-400 border-none font-black text-[9px] uppercase px-3">Filter: All</Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Citizen Signature</th>
                                            <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Network Tier</th>
                                            <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">vCredit Balance</th>
                                            <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400">Node Entry Date</th>
                                            <th className="p-8 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right">Authority Control</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-blue-50/30 transition-all group/row">
                                                <td className="p-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-14 w-14 bg-gradient-to-br from-slate-800 to-slate-950 rounded-[1.5rem] flex items-center justify-center text-blue-400 font-black text-lg shadow-xl group-hover/row:scale-110 transition-transform">
                                                            {u.email?.[0].toUpperCase() || 'X'}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-slate-900 tracking-tighter text-xl italic">{u.email || 'Mystery Citizen'}</div>
                                                            <div className="text-[10px] text-slate-400 font-mono font-bold mt-1 opacity-60">{u.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <Badge className="bg-slate-900 text-white border-none font-black text-[10px] uppercase px-5 py-2 rounded-xl shadow-lg tracking-[0.15em] group-hover/row:bg-blue-600 transition-colors">
                                                        {u.subscription_plan}
                                                    </Badge>
                                                </td>
                                                <td className="p-8">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="font-black text-3xl text-slate-900 tracking-tighter">{u.credits}</span>
                                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">vC</span>
                                                    </div>
                                                    <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">Net Balance Available</div>
                                                </td>
                                                <td className="p-8">
                                                    <div className="font-bold text-slate-700 text-sm">{new Date(u.created_at).toLocaleDateString([], { dateStyle: 'long' })}</div>
                                                </td>
                                                <td className="p-8 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 translate-y-2 group-hover/row:opacity-100 group-hover/row:translate-y-0 transition-all duration-300">
                                                        <Button
                                                            variant="outline"
                                                            className="rounded-full h-11 px-6 font-black uppercase text-[10px] tracking-widest border-slate-200 bg-white shadow-sm hover:border-blue-600 hover:text-blue-600 active:scale-[0.98]"
                                                            onClick={() => {
                                                                const amount = prompt("Set Absolute Credit Balance:", u.credits);
                                                                if (amount !== null) handleAction('/api/admin/users', { userId: u.id, action: 'update_credits', value: parseInt(amount) });
                                                            }}
                                                        >
                                                            Adjust Power
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="rounded-full h-11 px-6 font-black uppercase text-[10px] tracking-widest border-slate-200 bg-white shadow-sm hover:border-indigo-600 hover:text-indigo-600 active:scale-[0.98]"
                                                            onClick={() => {
                                                                const plan = prompt("Select Network Tier (free, basic, pro, premium):", u.subscription_plan);
                                                                if (plan) handleAction('/api/admin/users', { userId: u.id, action: 'update_plan', value: plan });
                                                            }}
                                                        >
                                                            Shift Tier
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
