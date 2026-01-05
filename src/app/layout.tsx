import './assets/scss/globals.css';
import './assets/scss/theme.css';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';
import Providers from '@/provider/providers';
import 'simplebar-react/dist/simplebar.min.css';
import TanstackProvider from '@/provider/providers.client';
import AuthProvider from '@/provider/auth.provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <AuthProvider>
        <TanstackProvider>
          <Providers>{children}</Providers>
        </TanstackProvider>
      </AuthProvider>
    </html>
  );
}
