import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Media Analytics",
  description: "Fullstack Analytics Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Top Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
                SMA
              </span>
              <h1 className="font-semibold tracking-tight">Social Media Analytics</h1>
            </div>
            <div className="flex items-center gap-1">
              <a href="/auth/login" className="px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
                Login
              </a>
              <a href="/auth/register" className="px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
                Register
              </a>
              <a href="/auth/forgot-password" className="px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
                Forgot Password
              </a>
            </div>
          </div>
          <div className="h-px w-full bg-white/10" />
        </nav>

        {/* Page Content */}
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
