import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import CartShell from "@/components/cart/CartShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-dashboard-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abooba Perfumes",
  description: "Premium perfume shopping experience for Abooba Perfumes.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-stone-50 text-stone-950 flex flex-col dark:bg-stone-950 dark:text-white"
      >
        <CartShell>{children}</CartShell>
      </body>
    </html>
  );
}
