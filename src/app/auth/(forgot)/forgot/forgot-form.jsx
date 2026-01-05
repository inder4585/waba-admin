"use client";
import React from "react";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {forgotPassword} from '@/api/auth.api'

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
});

const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
  startTransition(async () => {
    const email = data.email;
    try {
    const res = await forgotPassword(email)
     const result = res.data; 
      if (result?.error) {
        throw new Error(result.error);
      }
      toast.success("Reset Link Send Your Email Id.");
    } catch (err) {
      toast.error(err?.message || "Failed to send recovery email.");
    }
  });
};

  return (
    <div className="w-full">
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Forget Your Password?
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter your email & instructions will be sent to you!
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email{" "}
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={cn("", {
              "border-destructive": errors.email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
          {errors.email && (
            <div className=" text-destructive mt-2">{errors.email.message}</div>
          )}
        </div>

        <Button className="w-full mt-6" size={"lg"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Send Recovery Email"}
        </Button>
      </form>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Forget it. Send me back to{" "}
        <Link href="/auth/login" className="text-blue-700">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
