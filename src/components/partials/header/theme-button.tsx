'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Device, Moon, Sun } from '@/components/svg';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 
          data-[state=open]:bg-default-100 
           hover:text-primary text-default-500  rounded-full 
            "
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'p-2 font-medium text-sm text-default-600 cursor-pointer mb-[2px] ',
            {
              'bg-primary text-primary-foreground': theme === 'light',
            }
          )}
        >
          <Sun className="w-5 h-5 mr-2" />
          <span className="mr-2">Light</span>
          <Check
            className={cn('w-4 h-4 flex-none ml-auto ', {
              hidden: theme !== 'light',
            })}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'p-2 font-medium text-sm text-default-600 hover:bg-primary hover:text-primary-foreground cursor-pointer mb-[2px]',
            {
              'bg-primary text-primary-foreground': theme === 'dark',
            }
          )}
        >
          <Moon className="w-5 h-5 mr-2" />
          <span className="mr-2">Dark</span>
          <Check
            className={cn('w-4 h-4 flex-none ml-auto text-default-700', {
              hidden: theme !== 'dark',
            })}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
