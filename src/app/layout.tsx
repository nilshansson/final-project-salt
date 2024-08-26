import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SALT precourse platform",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="icon"
            href="/favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link
            rel="icon"
            href="/favicon-64x64.png"
            sizes="64x64"
            type="image/png"
          />
        </head>
        <body className={`${manrope.className} bg-saltLightGrey`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
