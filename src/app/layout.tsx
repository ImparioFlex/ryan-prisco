import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ryan Prisco | Mortgage & Lending Expert",
  description:
    "Residential and commercial mortgage expert with 26+ years of experience. Straight answers, smart structures, real relationships.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body style={{ fontFamily: "var(--font-manrope), 'Manrope', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
