import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Task Management Dashboard",
    template: "Task Management Dashboard",
  },
  description: "siteConfig.description",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="min-h-screen">
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
