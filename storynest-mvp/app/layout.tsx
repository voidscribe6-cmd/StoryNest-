import "@/styles/globals.css";
import Link from "next/link";

export const metadata = { title: "StoryNest", description: "MVP lectura" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
            <Link href="/" className="font-semibold">StoryNest</Link>
            <span className="text-sm opacity-70">MVP</span>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}