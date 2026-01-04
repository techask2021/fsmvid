
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Download, Mail, Zap, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/use-toast";
import { RecaptchaButton } from "@/components/forms/recaptcha";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormAction = async (formData: FormData) => {
        const recaptchaToken = formData.get("g-recaptcha-response");

        if (!recaptchaToken) {
            toast({
                title: "Verification Required",
                description: "Please complete the reCAPTCHA verification.",
                variant: "destructive"
            });
            return;
        }

        const result = await signUp(
            formData.get("email") as string,
            formData.get("password") as string,
            formData.get("firstName") as string,
            formData.get("lastName") as string,
            formData.get("phone") as string
        );

        if (result.success) {
            setIsSuccess(true);
            toast({
                title: "Identity Initialized",
                description: "Confirmation signal sent to your email frequency."
            });
            formRef.current?.reset();
        } else {
            toast({ title: "Initialization Failed", description: result.error || "Could not create account", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-48 pb-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            {/* Background Decorations */}
            {/* Premium Atmospheric Depth */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />

            <Card className="w-full max-w-4xl border-none shadow-3xl rounded-[3.5rem] overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl animate-in slide-in-from-bottom-10 duration-1000 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Branding/Value Prop */}
                    <div className="hidden md:flex bg-slate-950 p-12 flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Download className="w-5 h-5 text-white" />
                                </div>
                                <span className="font-black text-white text-xl tracking-tighter italic">FSMVID</span>
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tighter leading-tight italic">
                                Establish Your <span className="text-blue-500 underline decoration-blue-500/20">Identity</span>
                            </h2>
                            <p className="text-slate-400 mt-6 font-medium">Join the next generation of social media batch downloading.</p>

                            <ul className="mt-12 space-y-4">
                                {[
                                    { icon: Zap, text: "5 Free Starting Credits", color: "text-amber-400" },
                                    { icon: Sparkles, text: "Priority Cloud Processing", color: "text-blue-400" },
                                    { icon: CheckCircle2, text: "Unlimited ZIP Generation", color: "text-emerald-400" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Cluster: Global Stable</span>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-10 md:p-12 flex flex-col justify-center">
                        <div className="mb-10 text-center md:text-left">
                            <h3 className="text-3xl font-black tracking-tighter italic">Create <span className="text-blue-600">ID</span></h3>
                            <p className="text-slate-500 mt-2 font-medium">Initialize your personal node connection.</p>
                        </div>

                        {isSuccess ? (
                            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                                <div className="mx-auto bg-green-50 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-sm">
                                    <Mail className="w-10 h-10 text-green-600" />
                                </div>
                                <h4 className="text-2xl font-black tracking-tighter italic uppercase text-slate-900 mb-4">Verification Required</h4>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                    A confirmation signal has been transmitted to <span className="text-slate-900 font-bold">{email}</span>.
                                    Please verify your frequency via the link provided to activate your account node.
                                </p>
                                <Button onClick={() => router.push("/login")} className="w-full h-14 rounded-full bg-slate-900 hover:bg-black text-white font-black uppercase text-xs tracking-widest shadow-lg">
                                    Proceed to Login
                                </Button>
                            </div>
                        ) : (
                            <>
                                <form ref={formRef} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</p>
                                            <Input
                                                name="firstName"
                                                placeholder="John"
                                                defaultValue={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</p>
                                            <Input
                                                name="lastName"
                                                placeholder="Doe"
                                                defaultValue={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Contact</p>
                                        <Input
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            defaultValue={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Universal Signal (Email)</p>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="user@network.com"
                                                defaultValue={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-12 h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Protocol (Password)</p>
                                        <div className="relative group">
                                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                            <Input
                                                name="password"
                                                type="password"
                                                placeholder="••••••••••••"
                                                defaultValue={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-12 h-16 rounded-[2rem] bg-white dark:bg-blue-900/10 border-slate-200 dark:border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <RecaptchaButton formAction={handleFormAction} formRef={formRef} />
                                </form>

                                <div className="mt-8 pt-8 border-t flex flex-col items-center gap-6">
                                    <div className="flex items-center justify-center gap-1.5 text-slate-500 text-sm">
                                        <span>Already identified?</span>
                                        <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4">Login</Link>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Encrypted Entry Point</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
