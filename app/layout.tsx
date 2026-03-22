import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Address Book - SAP BTP",
  description: "Enterprise Address Book with Supabase Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}