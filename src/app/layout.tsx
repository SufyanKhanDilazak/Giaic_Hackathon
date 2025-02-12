import type { Metadata } from 'next';
import './globals.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Newsletter } from './components/Newsletter';
import { CartProvider } from './components/CartContext';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Shop.co',
  description: 'Your one-stop shop for all your fashion needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <Header />
            {children}
            <Newsletter />
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}