"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BulkProgress } from "@/components/download/bulk-progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, History, User, CreditCard, Coins } from "lucide-react";

// Mock user for now (replace with real auth later)
const USER_ID = "mock-user-id";

interface JobRecord {
    id: string;
    created_at: string;
    status: string;
    total_files: number;
    completed_files: number;
}

// Separate component to handle search params
function DashboardContent() {
    const searchParams = useSearchParams();
    const initialJobId = searchParams.get("jobId");

    const [activeJobId, setActiveJobId] = useState<string | null>(initialJobId);
    const [history, setHistory] = useState<JobRecord[]>([]);
    const [credits, setCredits] = useState<number | null>(null);

    // Fetch credits
    useEffect(() => {
        // In a real app, you'd fetch this from your API or Supabase directly
        setCredits(10); // Mock credits
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your downloads and subscription.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-full">
                                <Coins className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Balance</p>
                                <p className="text-xl font-bold">{credits !== null ? credits : "..."} <span className="text-sm font-normal text-muted-foreground">Credits</span></p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button>Get More Credits</Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">Download History</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    {activeJobId ? (
                        <Card className="border-blue-500/20 shadow-lg">
                            <CardHeader>
                                <CardTitle>Active Job</CardTitle>
                                <CardDescription>Your download is processing right now.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkProgress
                                    jobId={activeJobId}
                                    onComplete={() => {
                                        // Maybe refresh history
                                    }}
                                />
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-dashed">
                            <CardContent className="py-12 flex flex-col items-center text-center">
                                <div className="bg-muted p-4 rounded-full mb-4">
                                    <Download className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium mb-2">No Active Downloads</h3>
                                <p className="text-muted-foreground max-w-sm mb-6">
                                    Ready to download? Paste your links and start a new batch job.
                                </p>
                                <Button asChild>
                                    <a href="/bulk-download">Start New Download</a>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="w-5 h-5" /> Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground text-center py-8">
                                    No recent downloads found.
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" /> Account Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <span className="text-muted-foreground">Plan</span>
                                        <Badge variant="secondary">Free</Badge>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <span className="text-muted-foreground">Email</span>
                                        <span>user@example.com</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Joined</span>
                                        <span>Jan 2, 2026</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Download History</CardTitle>
                            <CardDescription>View and re-download your past jobs (links expire in 24h).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-center py-10">You haven't downloaded any files yet.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="subscription">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Subscription</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground">You are currently on the <span className="font-semibold text-foreground">Free Plan</span>.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {['Basic', 'Pro', 'Premium'].map((plan) => (
                                    <div key={plan} className="border rounded-lg p-6 flex flex-col gap-4">
                                        <h3 className="font-bold text-lg">{plan}</h3>
                                        <div className="text-2xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                                        <ul className="text-sm space-y-2 flex-1">
                                            <li>✓ 50 Credits / month</li>
                                            <li>✓ Priority Processing</li>
                                            <li>✓ No Speed Limits</li>
                                        </ul>
                                        <Button variant="outline" className="w-full">Upgrade</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
                Loading Dashboard...
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
