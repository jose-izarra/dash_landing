import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Dash",
  description: "Aumenta tus ingresos con la plataforma más ágil del mercado",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${inter.className} antialiased`}
        >
        {children}
      </body>
    </html>
  );
}
