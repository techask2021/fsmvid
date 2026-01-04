
"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Archive, Check } from "lucide-react";
import Link from "next/link";

export default function CreditPurchaseCalculator({ authenticated = false }: { authenticated?: boolean }) {
    const [credits, setCredits] = useState(300);

    // Dynamic pricing calculation
    // Base price per credit derived from $9.99 / 300 credits approx $0.0333
    // We add a slight volume discount above certain thresholds
    const calculatePrice = (amount: number) => {
        let pricePerCredit = 0.04; // Base price for small amounts (Starts at $2.00 for 50 credits)

        if (amount >= 5000) {
            pricePerCredit = 0.018; // High volume discount
        } else if (amount >= 1000) {
            pricePerCredit = 0.02; // Matches $19.99 tier ($0.02/credit) - Aligned with Commander Plan
        } else if (amount >= 300) {
            pricePerCredit = 0.0333; // Matches $9.99 tier ($0.033/credit) - Aligned with Operator Plan
        }

        return (amount * pricePerCredit).toFixed(2);
    };

    return (
        <section className="bg-slate-50 dark:bg-slate-950 py-12 px-4 border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-10 space-y-4">
                    <Badge className="bg-purple-600/10 text-purple-600 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                        Pay As You Go
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-tight">
                        Custom <span className="text-purple-600">Credit Pack</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">
                        Need more power? Purchase credits instantly without a subscription.
                    </p>
                </div>

                <Card className="border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-12 items-center">

                            {/* Slider Side */}
                            <div className="flex-1 w-full space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm font-black uppercase tracking-widest text-slate-500">Select Amount</label>
                                        <div className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">
                                            {credits.toLocaleString()} <span className="text-sm text-slate-400 tracking-normal not-italic font-medium uppercase align-middle ml-1">Credits</span>
                                        </div>
                                    </div>
                                    <Slider
                                        defaultValue={[300]}
                                        min={50}
                                        max={50000}
                                        step={10}
                                        onValueChange={(vals) => setCredits(vals[0])}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>50 Credits</span>
                                        <span>50,000 Credits</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                                        <Zap className="w-4 h-4 text-purple-600" /> Instant Delivery
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                                        <Archive className="w-4 h-4 text-purple-600" /> Usage Never Expires
                                    </div>
                                </div>
                            </div>

                            {/* Summary Side */}
                            <div className="w-full md:w-[320px] bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 text-center space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Price</p>
                                    <div className="text-5xl font-black italic tracking-tighter text-purple-600">
                                        ${calculatePrice(credits)}
                                    </div>
                                </div>

                                <ul className="space-y-3 text-left">
                                    <li className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">
                                        <Check className="w-3 h-3 text-green-500" /> One-time payment
                                    </li>
                                    <li className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">
                                        <Check className="w-3 h-3 text-green-500" /> Add to existing balance
                                    </li>
                                </ul>

                                <Button asChild className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-purple-600/20 active:scale-95 transition-all">
                                    <Link href={authenticated ? `/payment/manual?type=credits&amount=${credits}&price=${calculatePrice(credits)}` : "/signup"}>
                                        Purchase Credits
                                    </Link>
                                </Button>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
