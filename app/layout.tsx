import React, { ReactNode } from 'react';
import { AppProvider } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'CV to Personal Site Generator',
  description: 'Instantly create a beautiful portfolio and blog from your CV.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
