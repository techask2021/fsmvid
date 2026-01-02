"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Copy, Check, Info } from 'lucide-react';

const PLANS = {
    basic: { name: 'Basic', price: 9.99, credits: 50 },
    pro: { name: 'Pro', price: 29.99, credits: 200 },
    premium: { name: 'Premium', price: 59.99, credits: 500 },
};

export default function ManualPaymentPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('basic');
    const [txHash, setTxHash] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // YOUR WALLET ADDRESS (Replace this!)
    const BINANCE_PAY_ID = "YOUR_BINANCE_ID"; // Or User ID
    const WALLET_ADDRESS = "0x...YOUR_USDT_ADDRESS...";

    const copyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }

        if (txHash.length < 10) {
            setError("Please enter a valid Transaction Hash / ID");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/payment/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    plan: selectedPlan,
                    txHash: txHash,
                    amount: PLANS[selectedPlan].price
                })
            });

            if (!response.ok) throw new Error("Failed to submit payment");

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="container max-w-md py-20 px-4">
                <Card className="border-green-500/20 bg-green-50/50">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-green-100 p-3 rounded-full mb-4 w-fit">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-green-700">Payment Submitted!</CardTitle>
                        <CardDescription>
                            Thank you! We have received your transaction request.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-sm text-green-800">
                            We will verify your transaction manually (usually within 1-2 hours).
                            Your credits will be added as soon as it's confirmed.
                        </p>
                        <Button onClick={() => router.push('/dashboard')} className="w-full">
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-lg py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Add Credits</h1>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Manual Payment (Binance Pay)</CardTitle>
                        <CardDescription>
                            Send USDT to the address below and submit the transaction hash.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">

                        {/* 1. Select Plan */}
                        <div className="space-y-3">
                            <Label>Select Package</Label>
                            <RadioGroup
                                value={selectedPlan}
                                onValueChange={(v) => setSelectedPlan(v as keyof typeof PLANS)}
                                className="grid grid-cols-1 gap-2"
                            >
                                {Object.entries(PLANS).map(([key, plan]) => (
                                    <div key={key} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${selectedPlan === key ? 'border-primary ring-1 ring-primary' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value={key} id={key} />
                                            <Label htmlFor={key} className="cursor-pointer font-medium">
                                                {plan.name} <span className="text-muted-foreground font-normal">({plan.credits} Credits)</span>
                                            </Label>
                                        </div>
                                        <span className="font-bold">${plan.price}</span>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* 2. Wallet Info */}
                        <div className="bg-muted p-4 rounded-lg space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Send USDT (BEP20) to:</span>
                                <Button variant="ghost" size="sm" type="button" onClick={copyAddress} className="h-6 px-2">
                                    {isCopied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                                    {isCopied ? "Copied" : "Copy"}
                                </Button>
                            </div>
                            <code className="block bg-background p-2 rounded border text-xs break-all font-mono">
                                {WALLET_ADDRESS}
                            </code>
                            <div className="text-xs text-orange-500 font-medium mt-1">
                                ⚠️ Send EXACTLY <span className="text-foreground">${PLANS[selectedPlan].price}</span>. Incorrect amounts may be lost.
                            </div>
                        </div>

                        {/* 3. Transaction Hash */}
                        <div className="space-y-2">
                            <Label htmlFor="txHash">Transaction Hash (TxID)</Label>
                            <Input
                                id="txHash"
                                placeholder="e.g. 0x8f2d..."
                                value={txHash}
                                onChange={(e) => setTxHash(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Paste the Transaction ID from Binance here.
                            </p>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <Info className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Submit for Verification"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
