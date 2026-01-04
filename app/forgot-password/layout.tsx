import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recover Access | FSMVID",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ForgotPasswordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
