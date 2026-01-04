
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Download, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            toast({ title: "Welcome back!", description: "Accessing your terminal..." });
            router.push("/dashboard");
        } else {
            toast({ title: "Identification Failed", description: result.error || "Invalid credentials", variant: "destructive" });
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-48 pb-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            {/* Premium Atmospheric Depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />

            <Card className="w-full max-w-md border-none shadow-3xl rounded-[3rem] overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in fade-in zoom-in duration-700 relative z-10">
                <CardHeader className="p-10 text-center">
                    <div className="w-16 h-16 bg-slate-950 dark:bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group transition-transform hover:rotate-6">
                        <Download className="w-8 h-8 text-white dark:text-slate-900" />
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter italic">Welcome <span className="text-blue-600">Back</span></CardTitle>
                    <CardDescription className="text-slate-500 font-medium mt-2">Resume your high-speed batch downloads.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Universal Signal (Email)</p>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12 h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Protocol (Password)</p>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end pr-1">
                                <Link href="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                                    Lost Identification?
                                </Link>
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-900 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl group active:scale-[0.98] transition-all mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? "Synchronizing..." : "Access Terminal"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="p-10 border-t bg-slate-50/50 dark:bg-slate-800/20 flex flex-col gap-6">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500 text-sm">
                        <span>New to the network?</span>
                        <Link href="/signup" className="text-blue-600 font-black hover:underline underline-offset-4">Create ID</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
