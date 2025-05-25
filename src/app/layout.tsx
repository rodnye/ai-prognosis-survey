import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { PageWrapper } from '@/features/shared/components/PageWrapper';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Encuestas Medicina vs AI',
  description: 'Encuestas Medicina vs AI de Mairelys',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} antialiased`}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
