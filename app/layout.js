import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import BackToTopButton from "@/components/common/BackToTopButton";
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

const themeScript = `
  (function () {
    try {
      var theme = window.localStorage.getItem("abooba-theme") === "light" ? "light" : "dark";
      document.documentElement.classList.add(theme);
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        <CartShell>
          {children}
          <BackToTopButton />
        </CartShell>
      </body>
    </html>
  );
}
