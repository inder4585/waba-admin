'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import googleIcon from '@/public/images/auth/google.png';
import { useMediaQuery } from '@/hooks/use-media-query';
import RequestEmail from './request-email';
import { signUp } from '@/api/auth.api';
import {
  passwordMessage,
  passwordRegex,
  privacy,
} from '@/utils/image-constent';
import { AxiosError } from 'axios';

const schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().regex(passwordRegex, `${passwordMessage}`),
    confirmPassword: z.string(),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({
        message: 'You must accept the terms and conditions',
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof schema>;

const RegForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryEmail = searchParams?.get('email');
  const email =
    typeof window !== 'undefined' && window.sessionStorage
      ? sessionStorage.getItem('email')
      : '';
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );
  const [cpasswordType, setCPasswordType] = useState<'password' | 'text'>(
    'password'
  );

  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const toggleCPasswordType = () => {
    setCPasswordType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        if (!email) {
          toast.error('Email is required');
          return;
        }

        const payload = {
          firstName: `${data.firstName}`,
          lastName: `${data.lastName}`,
          mobileNumber: '0',
          email: email,
          password: data.password,
        };

        const response = await signUp(payload);
        if (response?.data?.data) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message || 'Registration failed');
          return;
        }

        const signInResponse = await signIn('credentials', {
          email: email,
          password: data.password,
          redirect: false,
        });

        if (signInResponse?.error) {
          toast.error(signInResponse.error);
        } else {
          sessionStorage?.setItem('email', '');
          router.push('/');
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data?.message ||
            'An unexpected error occurred. Please try again.'
        );
      }
    });
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl 2xl:text-3xl font-bold text-default-900 mb-1">
        {' '}
        Create account
      </h2>
      <p className="text-default-600 mb-6"></p>

      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-3 border-default-300 py-6"
        >
          <Image
            src={googleIcon}
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-default-700">
            Continue with Google
          </span>
        </Button>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <hr className="flex-1 border-t border-default-200" />
        <span className="text-sm text-default-500">or</span>
        <hr className="flex-1 border-t border-default-200" />
      </div>
      {typeof email === 'string' &&
      typeof queryEmail === 'string' &&
      email === queryEmail ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 my-2"
        >
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                disabled={isPending}
                {...register('firstName')}
                className={cn({ 'border-destructive': errors.firstName })}
                size={!isDesktop2xl ? 16 : 14}
              />
              {errors.firstName && (
                <p className="text-destructive text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                disabled={isPending}
                {...register('lastName')}
                className={cn({ 'border-destructive': errors.lastName })}
                size={!isDesktop2xl ? 16 : 14}
              />
              {errors.lastName && (
                <p className="text-destructive text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={passwordType}
                id="password"
                disabled={isPending}
                {...register('password')}
                className={cn({ 'border-destructive': errors.password })}
                size={!isDesktop2xl ? 16 : 14}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordType}
              >
                <Icon
                  icon={
                    passwordType === 'password'
                      ? 'heroicons:eye'
                      : 'heroicons:eye-slash'
                  }
                  className="w-5 h-5 text-default-400"
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                type={cpasswordType}
                disabled={isPending}
                {...register('confirmPassword')}
                className={cn({ 'border-destructive': errors.confirmPassword })}
                size={!isDesktop2xl ? 16 : 14}
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={toggleCPasswordType}
              >
                <Icon
                  icon={
                    cpasswordType === 'password'
                      ? 'heroicons:eye'
                      : 'heroicons:eye-slash'
                  }
                  className="w-5 h-5 text-default-400"
                />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              {...register('acceptedTerms')}
            />
            <Label
              htmlFor="terms"
              className="text-sm text-default-600"
            >
              You accept our{' '}
              <Link
                target="_blank"
                href={privacy}
                className="text-blue-700"
              >
                Terms & Conditions
              </Link>
            </Label>
          </div>
          {errors.acceptedTerms && (
            <p className="text-destructive text-sm">
              {errors.acceptedTerms.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            size="lg"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Registering...' : 'Create an Account'}
          </Button>
        </form>
      ) : (
        <RequestEmail />
      )}

      <div className="mt-6 text-center text-base text-default-600">
        Already Registered?{' '}
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

export default RegForm;
