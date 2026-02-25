import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power Pulse",
  description: "Training App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-black text-white min-h-screen`}>
        <div className="w-full max-w-360 mx-auto ">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
