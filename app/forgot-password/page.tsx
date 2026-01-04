
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Mail, ArrowLeft, Send, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RecaptchaButton } from "@/components/forms/recaptcha";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
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

        const emailValue = formData.get("email") as string;

        // Simulate reset request
        toast({
            title: "Reset Signal Sent",
            description: `If an account exists for ${emailValue}, a recovery link has been dispatched.`
        });

        formRef.current?.reset();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-48 pb-20 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            {/* Premium Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full" />

            <Card className="w-full max-w-md border-none shadow-3xl rounded-[3rem] overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in fade-in zoom-in duration-700 relative z-10">
                <CardHeader className="p-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter italic">Recover <span className="text-blue-600">Access</span></CardTitle>
                    <CardDescription className="text-slate-500 font-medium mt-2">Enter your email to receive a secure reset link.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                    <form ref={formRef} className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Universal Signal (Email)</p>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-12 h-16 rounded-[2rem] bg-blue-50/40 dark:bg-blue-900/10 border-transparent focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 font-bold transition-all text-slate-900 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <RecaptchaButton formAction={handleFormAction} formRef={formRef} />
                    </form>
                </CardContent>
                <CardFooter className="p-10 border-t bg-slate-50/50 dark:bg-slate-800/20 flex flex-col items-center">
                    <Link href="/login" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
