import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { UserProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Tư Vấn Luật Giao Thông Việt Nam ",
  description: "SWD392 - Tu Van Luat Giao Thong Viet Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body
        className={`${montserrat.variable} antialiased`}
      >
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>


        <Toaster />
      </body>
    </html>
  );
}
