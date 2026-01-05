'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import googleIcon from '@/assets/images/auth/google.png';
import { useMediaQuery } from '@/hooks/use-media-query';
import { passwordMessage, passwordRegex } from '@/utils/image-constent';
import { Login } from '@/types/auth';

const schema = z.object({
  email: z.string().email({ message: 'Your email is invalid.' }),
  password: z.string().regex(passwordRegex, `${passwordMessage}`),
});
const LogInForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState('password');
  const isDesktop2xl = useMediaQuery('(max-width: 1530px)');
  const togglePasswordType = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Login) => {
    startTransition(async () => {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        const sessionResponse = await fetch('/api/auth/session');
        const session = await sessionResponse.json();
        localStorage.setItem('token', 'true');

        // if (session?.user?.mfaEnabled) {
        //   router.push(`/auth/mfa?email=${data.email}`);
        //   return;
        // }
        toast.success('Login Successful');

        router.push('/');
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };

  return (
    <div className="w-full py-10">
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Login to Videostori
      </div>
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
        <span className="text-sm text-default-500">Or </span>
        <hr className="flex-1 border-t border-default-200" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 2xl:mt-7"
      >
        <div>
          <Label
            htmlFor="email"
            className="mb-2 font-medium text-default-600"
          >
            Email{' '}
          </Label>
          <Input
            disabled={isPending}
            {...register('email')}
            type="email"
            id="email"
            className={cn('', {
              'border-destructive': errors.email,
            })}
            size={!isDesktop2xl ? 20 : 16}
          />
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            {' '}
            Password{' '}
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register('password')}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? 20 : 16}
              placeholder=" "
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === 'password' ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex opacity-0  items-center gap-1.5 ">
            <Checkbox
              className="border-default-300 mt-[1px]"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/auth/forgot"
            className="flex-none text-sm text-primary"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          className="w-full"
          disabled={isPending}
          size={'lg'}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Loading...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{' '}
        <Link
          href="/auth/register"
          className="text-blue-700"
        >
          {' '}
          Sign Up{' '}
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
