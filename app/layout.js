import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hunting Coder",
  description:
    "A simple blog website made with NextJs 13, Tailwind CSS & Appwrite Database. @TAUSUR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed w-full">
          <Navbar />
        </div>
        <div className="pt-16 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-800">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
