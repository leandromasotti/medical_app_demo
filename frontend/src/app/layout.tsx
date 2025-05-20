import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Medical Marketplace',
  description: 'A marketplace for medical products and procedures',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Medical Marketplace</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/products" className="hover:underline">Products</a></li>
                <li><a href="/profile" className="hover:underline">Profile</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Medical Marketplace. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
