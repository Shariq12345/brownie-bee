import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/providers/toast-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cake Shop",
  description: "The best cakes in town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background antialiased font-serif")}>
          <ToastProvider />
          <img
            src="/img/hero.svg"
            alt="Background Svg"
            className="absolute -z-10 top-0 right-0 w-full md:w-[60%]"
          />
          <Header userId={userId} />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
