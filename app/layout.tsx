import { Inter } from "next/font/google";
// import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      {/* <GoogleTagManager gtmId="GTM-XYZ" /> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
