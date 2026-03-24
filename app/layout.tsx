import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../assets/styles/globals.css";
import { cn } from "@/lib/utils";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "../lib/costants/index";
import { URL } from "url";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });



export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
            <body className={`${inter.className} antialiased`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
