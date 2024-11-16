import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import NavBar from "@/components/organism/NavBar";

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
          fontSans.variable,
        )}
      >
        <div className="flex flex-col xl:grid xl:grid-cols-[280px_1fr] min-h-screen">
          <header className="xl:sticky xl:top-0 xl:h-screen bg-BG">
            <NavBar />
          </header>

          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
