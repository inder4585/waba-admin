"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { resetPassword } from "@/api/auth.api";
import { passwordMessage, passwordRegex } from '@/utils/image-constent';

const schema = z.object({
 password: z.string().regex(passwordRegex, `${passwordMessage}`),
  confirmPassword: z
    .string()  
    .min(4, { message: "Your password must be at least 4 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
const CreatePasswordForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [newPasswordType, setNewPasswordType] = React.useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = React.useState(false);
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
 const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

 const onSubmit = (data) => {
  const { password } = data;

  startTransition(async () => {
    try {
      await resetPassword(email,password) 
       toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
      router.push("/auth/login");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } 
  });
};
  return (
    <div className="w-full">
     
      <div className="2xl:mt-8 mt-6 2xl:text-3xl lg:text-2xl text-xl font-bold text-default-900">
        Create New Password
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter your password to unlock the screen!
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="password"
              className="mb-2 font-medium text-default-600"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                disabled={isPending}
                {...register("password")}
                type={newPasswordType ? "text" : "password"}
                id="password"
                size={!isDesktop2xl ? "xl" : "lg"}
                className={cn("", {
                  "border-destructive": errors.password,
                })}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                onClick={() => setNewPasswordType(!newPasswordType)}
              >
                {newPasswordType ? (
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
            {errors.password && (
              <div className=" text-destructive mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="mb-2 font-medium text-default-600"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                disabled={isPending}
                {...register("confirmPassword")}
                type={confirmPasswordType ? "text" : "password"}
                id="confirmPassword"
                className={cn("", {
                  "border-destructive": errors.confirmPassword,
                })}
                size={!isDesktop2xl ? "xl" : "lg"}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                onClick={() => setConfirmPasswordType(!confirmPasswordType)}
              >
                {confirmPasswordType ? (
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
            {errors.confirmPassword && (
              <div className=" text-destructive mt-2">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>

       
        <Button className="w-full mt-8" size="lg">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Not now? Return{" "}
        <Link href="/auth/register" className="text-primary">
          {" "}
          Sign In{" "}
        </Link>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
