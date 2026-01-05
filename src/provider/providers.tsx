'use client';
import { Inter } from 'next/font/google';
import { useThemeStore } from '@/store';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore() as {
    theme: string;
    radius: number;
  };

  return (
    <body
      // className={cn('dash-tail-app ', inter.className, 'theme-' + theme)}
      style={
        {
          '--radius': `${radius}rem`,
        } as React.CSSProperties
      }
    >
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <div className={cn('h-full  ')}>{children}</div>
        <Toaster />
      </ThemeProvider>
    </body>
  );
};

export default Providers;
