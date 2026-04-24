import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./commercial.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "RP Commercial Capital | Ryan Prisco",
  description:
    "Bridge loans, construction financing, equity solutions, and strategic capital advisory for serious investors and developers.",
};

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${notoSerif.variable} cc-scope`}>{children}</div>
  );
}
