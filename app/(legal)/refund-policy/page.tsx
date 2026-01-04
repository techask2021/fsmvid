import Image from "next/image"
import HeroSectionStyles from "@/components/content/hero-section-styles"
import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, RefreshCw, Mail, CheckCircle, XCircle, AlertCircle, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "Refund Policy | FSMVID | Free Social Media Video Downloader",
    description: "Read our refund policy regarding credit purchases and subscriptions.",
}

export default function RefundPolicyPage() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Elite SaaS Hero */}
            <section className="relative min-h-[50vh] overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 mb-8 group">
                <HeroSectionStyles />

                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/pages.png"
                        alt="Hero Background"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-slate-950/60 transition-all duration-700 group-hover:bg-slate-950/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent opacity-50" />
                </div>

                {/* Atmospheric Orbs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2" />

                <div className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
                    <Badge className="mb-8 bg-blue-600 text-white border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <FileText className="w-3.5 h-3.5 mr-2" />
                        Policy Document
                    </Badge>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic leading-tight mb-8 uppercase text-white drop-shadow-2xl">
                        Refund <span className="text-blue-400">Policy</span>
                    </h1>

                    <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <p className="text-lg md:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md">
                            Transparency regarding our cancellation and return services.
                            <br />
                            <span className="text-base text-blue-200 italic">We aim for fairness and clarity in all transactions.</span>
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-slate-200 border border-white/10 mt-4">
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold uppercase tracking-wider">Last updated: {currentDate}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="bg-white dark:bg-slate-950 py-16">
                <div className="container max-w-4xl mx-auto px-4 space-y-8">

                    {/* Core Philosophy */}
                    <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
                        <CardContent className="p-8 md:p-10">
                            <div className="flex items-center mb-8">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">Policy Overview</h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                    At FSMVID, we strive to provide the highest quality bulk downloading service. We understand that sometimes plans change or mistakes happens. Our refund policy is designed to be fair to both our users and our operational costs.
                                </p>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-3">The Golden Rule</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">
                                        Refunds are generally available ONLY if you have not used the purchased credits. Once network processing power (credits) has been consumed, the service is considered "delivered" and is non-refundable.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Terms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-green-100 shadow-lg shadow-green-500/5 rounded-2xl overflow-hidden bg-green-50/50 dark:bg-green-950/10">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <h3 className="font-black uppercase tracking-wider text-slate-900 dark:text-white">Eligible for Refund</h3>
                                </div>
                                <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                        You have made a purchase but have NOT started any bulk tasks.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                        Your credit balance remains equal to the purchased amount (e.g., 300/300).
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                        The request is made within 7 days of the transaction.
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border border-red-100 shadow-lg shadow-red-500/5 rounded-2xl overflow-hidden bg-red-50/50 dark:bg-red-950/10">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                    <h3 className="font-black uppercase tracking-wider text-slate-900 dark:text-white">Not Eligible</h3>
                                </div>
                                <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                        You have initiated a bulk download task.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                        Any amount of credits from the pack has been used.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="block w-1 h-1 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                        Account violations resulting in suspension.
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-none bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20">
                        <CardContent className="p-8 flex items-start gap-4">
                            <AlertCircle className="w-8 h-8 shrink-0 text-blue-200 mt-1" />
                            <div>
                                <h3 className="font-black uppercase tracking-wider text-lg mb-2">Try Before You Buy</h3>
                                <p className="text-blue-100 font-medium leading-relaxed text-sm">
                                    We strongly encourage all users to utilize our <strong>Free Plan</strong> first. This allows you to test our download speed, quality, and platform compatibility completely risk-free before committing to a paid credit package.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact for Refunds */}
                    <Card className="border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl overflow-hidden group/card bg-white dark:bg-slate-900 dark:border-slate-800">
                        <CardContent className="p-8 md:p-10">
                            <div className="flex items-center mb-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-blue-600/10 text-blue-600 shadow-sm mr-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-all duration-500">
                                    <HelpCircle className="w-6 h-6" />
                                </div>
                                <h2 className="font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none text-xl md:text-2xl">How to Request a Refund</h2>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed text-sm mb-6">
                                If you meet the eligibility criteria above and wish to cancel your purchase, please contact our support team. Include your transaction ID and email address.
                            </p>

                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow w-fit">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a href="mailto:support@fsmvid.com" className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg">
                                    support@fsmvid.com
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </section>
        </div>
    )
}
