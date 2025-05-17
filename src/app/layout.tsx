import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App Demo",
  description: "A simple blog app demo using Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
