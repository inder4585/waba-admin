'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authVerify } from '@/api/auth.api';
import { User } from '@/types/user.types';

interface MfaAuthenticationProps {
  user?: User;
  callBackurl: string;
}

const MfaAuthentication = ({ user, callBackurl }: MfaAuthenticationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalOtpField = 6;
  const [otp, setOtp] = useState(Array(totalOtpField).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < totalOtpField - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = '';
        return newOtp;
      });
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === 'ArrowRight' && index < totalOtpField - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpVerification = async () => {
    const otpString = otp.join('');
    if (otpString.length === totalOtpField) {
      setIsLoading(true);

      try {
        const response = await authVerify({
          userId: user?.id,
          otpcode: otpString,
        });

        if (response.data?.data) {
          toast.success('Authentication successful!');
          if (localStorage.getItem('verifiedprofile')) {
            localStorage.removeItem('verifiedprofile');
          }
          router.push(`${callBackurl}`);
        } else {
          toast.error('Invalid authentication code. Please try again');
        }
      } catch (error) {
        toast.error('Verification failed!');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="mt-8">
      <div className="flex flex-wrap justify-around gap-1 lg:gap-6">
        {otp.map((value, index) => (
          <Input
            key={`otp-code-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            maxLength={1}
            className="w-10 h-10 sm:w-[60px] sm:h-16 rounded border-default-300 text-center text-2xl font-medium text-default-900"
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
          />
        ))}
      </div>

      <div className="mt-6">
        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={handleOtpVerification}
          disabled={isLoading || otp.some((value) => value === '')}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          ) : (
            'Verify'
          )}
        </Button>
      </div>
    </form>
  );
};

export default MfaAuthentication;
