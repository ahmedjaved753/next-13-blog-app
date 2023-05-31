import "./globals.css";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "A Blog App to Create/Read Blogs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
