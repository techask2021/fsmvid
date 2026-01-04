import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Secure Payment | FSMVID",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PaymentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
