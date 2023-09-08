import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import AuthProvider from "@/components/provider/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-slate-900 text-mWhite`}>
        <AuthProvider>
          <Navbar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
