import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ChevronDown, Mail, Smartphone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import VerifyForm from '@/components/auth/verify-form';
import MfaAuthentication from './VerifyAuthenticationApp';
import { emailVerify } from '@/api/auth.api';
import { SessionData } from '@/types/session';

const MFA = () => {
  const [selectedOption, setSelectedOption] = useState('Email');
  const { data: session } = useSession() as { data: SessionData | null };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (option === 'Email') {
      sendOtp();
    }
  };

  const sendOtp = async () => {
    const email = session?.user?.email || '';
    try {
      const res = await emailVerify(email);
      const result = res.data;
      if (result?.error) {
        throw new Error(result.error);
      }
      toast.success('Email Sent.');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to send recovery email.');
    }
  };

  useEffect(() => {
    if (session?.user?.mfaMethod === 'email') {
      setSelectedOption('Email');
      sendOtp();
    } else if (session?.user?.mfaMethod === 'authenticator') {
      setSelectedOption('Authentication App');
    }
  }, [session?.user?.mfaMethod]);

  return (
    <div>
      <div className="space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                {selectedOption === 'Email' ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <Smartphone className="h-4 w-4" />
                )}
                <span className="font-semibold">{selectedOption}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem
              onClick={() => handleSelect('Email')}
              className={
                selectedOption === 'Email' ? 'border-l-4 border-l-primary' : ''
              }
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelect('Authentication App')}
              className={
                selectedOption === 'Authentication App'
                  ? 'border-l-4 border-l-primary'
                  : ''
              }
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Authentication App
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectedOption === 'Email' ? (
          <VerifyForm callBackurl="/" />
        ) : (
          <MfaAuthentication
            user={session?.user}
            callBackurl="/"
          />
        )}
      </div>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Forget it. Send me back to{' '}
        <Link
          href="/auth/login"
          className="text-blue-700"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default MFA;
