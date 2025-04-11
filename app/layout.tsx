import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "s1 - devsForFun",
  description:
    "s1 - devsForFun is a cool place for everyone who wants to be a developer or already are a developer. We got blogs, podcasts, and a discord community for developers, technical founders, and anyone interested in creating their own software to solve peoblems, have fun, or both! Welcome aboard so.. *ahem* developer!",
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.className} dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
