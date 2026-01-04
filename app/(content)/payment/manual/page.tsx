"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Copy, Check, Info, ShieldCheck, Zap, Crown, ArrowLeft, ScanLine } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { RecaptchaButton } from '@/components/forms/recaptcha';
import { useRef } from 'react';

const PLANS = {
    'basic node': { name: 'Basic Node', price: 4.99, credits: 50, icon: Zap },
    'basic saver': { name: 'Basic Saver', price: 0, credits: 5, icon: ShieldCheck }, // Updated to Free
    'pro operator': { name: 'Pro Operator', price: 9.99, credits: 150, icon: Crown }, // Legacy
    'bulk pro': { name: 'Bulk Pro', price: 9.99, credits: 300, icon: Crown }, // Added from dashboard
    'master commander': { name: 'Master Commander', price: 24.99, credits: 500, icon: ShieldCheck }, // Legacy
    'archive elite': { name: 'Archive Elite', price: 19.99, credits: 1000, icon: Crown }, // Added from dashboard
};

export default function ManualPaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, login, isLoading } = useAuth();

    const [selectedPlan, setSelectedPlan] = useState<string>('bulk pro');
    const [txHash, setTxHash] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    // Custom Credit Logic
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customCredits, setCustomCredits] = useState(0);
    const [customPrice, setCustomPrice] = useState(0);

    // Auth Guard
    useEffect(() => {
        if (!isLoading && !user) {
            const returnUrl = encodeURIComponent(window.location.href);
            router.push(`/login?redirectTo=${returnUrl}`);
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const type = searchParams.get('type');
        const planParam = searchParams.get('plan');
        const amountParam = searchParams.get('amount');
        const priceParam = searchParams.get('price');

        if (type === 'credits' && amountParam && priceParam) {
            setIsCustomMode(true);
            setCustomCredits(parseInt(amountParam));
            setCustomPrice(parseFloat(priceParam));
        } else if (planParam) {
            const normalizedPlan = planParam.toLowerCase();
            // Just basic matching or default
            if (PLANS[normalizedPlan as keyof typeof PLANS]) {
                setSelectedPlan(normalizedPlan);
                setIsCustomMode(false);
            }
        }
    }, [searchParams]);

    // YOUR WALLET ADDRESS (Replace this!)
    const WALLET_ADDRESS = "0x...YOUR_USDT_ADDRESS...";

    const copyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleFormAction = async (formData: FormData) => {
        if (!user) {
            login();
            return;
        }

        const recaptchaToken = formData.get("g-recaptcha-response");
        if (!recaptchaToken) {
            setError("Please complete the reCAPTCHA verification.");
            return;
        }

        const currentTxHash = formData.get("txHash") as string;

        // Strict BEP20 Transaction Hash Validation (0x followed by 64 hex characters)
        const bscHashRegex = /^0x([A-Fa-f0-9]{64})$/;
        if (!bscHashRegex.test(currentTxHash)) {
            setError("Invalid BEP20 Transaction Hash. Please provide a real 66-character hash starting with 0x.");
            return;
        }

        setError(null);

        const finalAmount = isCustomMode ? customPrice : PLANS[selectedPlan as keyof typeof PLANS]?.price;
        const finalPlanName = isCustomMode ? `Custom Pack (${customCredits} Cr)` : selectedPlan;

        try {
            const response = await fetch('/api/payment/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    plan: finalPlanName,
                    txHash: currentTxHash,
                    amount: finalAmount,
                    isCustom: isCustomMode,
                    credits: isCustomMode ? customCredits : PLANS[selectedPlan as keyof typeof PLANS]?.credits,
                    recaptchaToken
                })
            });

            if (!response.ok) throw new Error("Failed to submit payment");

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pt-48 pb-20 px-4 flex flex-col items-center justify-center">
                <Card className="max-w-md w-full border-none shadow-2xl rounded-[3.5rem] bg-white p-12 text-center animate-in zoom-in-95 duration-500">
                    <div className="mx-auto bg-green-50 p-6 rounded-full mb-8 w-fit shadow-inner">
                        <Check className="w-12 h-12 text-green-600" />
                    </div>
                    <CardTitle className="text-4xl font-black tracking-tighter italic mb-4">SIGNAL RECEIVED</CardTitle>
                    <CardDescription className="text-slate-500 text-lg font-medium mb-10">
                        Your transaction hash has been broadcasted to our network administrators.
                    </CardDescription>
                    <div className="p-6 bg-slate-50 rounded-3xl mb-10 text-sm text-slate-600 font-medium leading-relaxed">
                        We will manually verify the USDT transfer on the BEP20 network. Verification usually completes within 5 to 10 minutes max. If you encounter any issues, please contact us via email support@fsmvid.com; we are available 24/7.
                    </div>
                    <Button onClick={() => router.push('/dashboard')} className="w-full h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-widest shadow-xl active:scale-95 transition-all">
                        Return to Command Center
                    </Button>
                </Card>
            </div>
        );
    }

    const currentPlanInfo = PLANS[selectedPlan as keyof typeof PLANS];

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pt-32 pb-16 px-4">
            <div className="container max-w-7xl mx-auto">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all mb-8">
                    <ArrowLeft className="w-4 h-4" /> Back to Terminal
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase leading-[0.9]">Bulk Video Downloader <span className="text-blue-600">Power Access</span></h1>
                            <p className="text-slate-500 font-medium text-base leading-relaxed max-w-lg">Initialize a secure manual transfer to acquire high-performance <strong>bulk video downloader</strong> credits and processing usage.</p>
                        </div>

                        <Card className="border-none shadow-2xl rounded-[2.5rem] bg-slate-900 text-white overflow-hidden p-8 relative min-h-[300px] flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 ml-1">Selected Bulk Package</h3>
                            <div className="flex items-center gap-6 mb-8 relative z-10">
                                <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-900/50">
                                    {isCustomMode ? <Zap className="w-8 h-8 text-white" /> : (currentPlanInfo && <currentPlanInfo.icon className="w-8 h-8 text-white" />)}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black italic uppercase mb-1">{isCustomMode ? 'Custom Power Pack' : currentPlanInfo?.name}</h4>
                                    <div className="flex items-center gap-3">
                                        <p className="text-blue-400 font-black uppercase text-[10px] tracking-wider bg-blue-950/50 px-3 py-1 rounded-full">{isCustomMode ? customCredits : currentPlanInfo?.credits} vCredits</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-baseline justify-between pt-8 border-t border-white/10 relative z-10">
                                <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Total Cost</p>
                                <p className="text-5xl font-black italic tracking-tighter">${isCustomMode ? customPrice : currentPlanInfo?.price}</p>
                            </div>
                        </Card>
                    </div>

                    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white p-8 overflow-hidden">
                        <form ref={formRef} className="space-y-8">
                            {/* 1. Protocol Radio (Hidden in Custom Mode) */}
                            {!isCustomMode && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bulk Downloader Plan (Select Package)</p>
                                    <RadioGroup
                                        name="selectedPlan"
                                        value={selectedPlan}
                                        onValueChange={setSelectedPlan}
                                        className="grid grid-cols-1 gap-3"
                                    >
                                        {Object.entries(PLANS).filter(([key]) => ['basic saver', 'bulk pro', 'archive elite'].includes(key)).map(([key, plan]) => (
                                            <div key={key} className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${selectedPlan === key ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10' : 'border-slate-100 hover:bg-slate-50'}`}>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value={key} id={key} className="border-slate-300 text-blue-600 w-5 h-5" />
                                                    <Label htmlFor={key} className="cursor-pointer font-black uppercase tracking-tight italic text-sm">
                                                        {plan.name}
                                                    </Label>
                                                </div>
                                                <span className="font-black italic text-blue-600 text-lg">${plan.price}</span>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )}

                            {isCustomMode && (
                                <div className="p-6 bg-blue-50/30 rounded-[2rem] border border-blue-100/50 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Custom Allocation Active</p>
                                    <p className="text-2xl font-black italic text-slate-900 tracking-tight">{customCredits.toLocaleString()} Credits for ${customPrice}</p>
                                </div>
                            )}

                            {/* 2. Wallet Signature with QR */}
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Wallet Destination (USDT BEP20)</p>
                                <div className="bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100 space-y-8">
                                    {/* QR Code Section */}
                                    <div className="flex justify-center py-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                                        <div className="relative w-64 h-64 transition-transform duration-500 hover:scale-[1.02]">
                                            <Image
                                                src="/binance-qr.png"
                                                alt="Binance Pay QR Code"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100/50">
                                        <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-orange-700 font-medium leading-relaxed">
                                            Send exactly <span className="font-black underline">${isCustomMode ? customPrice : currentPlanInfo?.price}</span>. Transactions originating from outside the BEP20 network or with incorrect amounts cannot be recovered.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Transaction Acknowledgement */}
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Transaction Identity (TxID)</p>
                                <div className="relative group">
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <Input
                                        id="txHash"
                                        name="txHash"
                                        placeholder="Paste transaction hash here..."
                                        defaultValue={txHash}
                                        onChange={(e) => setTxHash(e.target.value)}
                                        className="w-full h-16 rounded-[2rem] bg-slate-50 border-2 border-transparent hover:bg-slate-100 focus:bg-white focus:border-blue-200 px-6 font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/10 transition-all outline-none"
                                        required
                                        style={{ paddingLeft: '4.5rem' }}
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert className="bg-red-50 border-red-100 text-red-600 rounded-3xl p-6">
                                    <Info className="h-5 w-5" />
                                    <AlertDescription className="font-bold ml-2">{error}</AlertDescription>
                                </Alert>
                            )}

                            <RecaptchaButton formAction={handleFormAction} formRef={formRef} />
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
