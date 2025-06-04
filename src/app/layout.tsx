import type { Metadata } from "next";
import {Arimo } from "next/font/google";
import "./globals.css";



const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${arimo.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
