import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import AuthProvider from "@/components/provider/AuthProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://dropconnect.vercel.app"
  ),
  title: "DropConnect",
  description: "Stay in touch",
  openGraph: {
    siteName: "DropConnect",
    type: "website",
    url: "https://dropconnect.vercel.app",
    title: "DropConnect",
    description: "Stay in touch",
    images: "/logo.png",
  },
  twitter: {
    title: "DropConnect",
    description: "Stay in touch",
    images: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-slate-900 text-mWhite`}>
        <AuthProvider>
          <Navbar />
          <main className="flex flex-col w-3/5 mx-auto mt-10">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
