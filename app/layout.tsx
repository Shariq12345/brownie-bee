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
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <style>{`
            .background-svg {
              position: absolute;
              top: 0;
              right: 0;
              width: 100%;
              height: auto;
              max-height: 100vh;
              object-fit: cover;
              object-position: top right;
              z-index: -10;
            }
            @media (min-width: 768px) {
              .background-svg {
                width: 60%;
              }
            }
          `}</style>
        </head>
        <body className={cn("bg-background antialiased font-sans")}>
          <ToastProvider />
          <img
            src="/img/hero.svg"
            alt="Background Svg"
            className="background-svg"
          />
          <Header userId={userId} />
          <main className="font-sans relative z-10">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
