"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { emailVerify, verifyOtp } from "@/api/auth.api";
import moment from "moment";

const VerfiyForm = ({callBackurl="/auth/register"}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email");
  const totalOtpField = 6;
  const [otp, setOtp] = useState(Array(totalOtpField).fill(""));
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(180);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < totalOtpField - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < totalOtpField - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("").trim();

    if (enteredOtp.length !== totalOtpField || !/^\d{6}$/.test(enteredOtp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
     await verifyOtp(email,enteredOtp) 

      toast.success("OTP verified!");
      if (localStorage.getItem("verifiedprofile")) {
        localStorage.removeItem("verifiedprofile");
      }
      router.push(`${callBackurl}?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
      setOtp(Array(totalOtpField).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await emailVerify(email);
      toast.success("OTP resent successfully");
      setResendTimer(60);
    } catch (err) {
      toast.error(err?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };


  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
  const enteredOtp = otp?.join("").trim();

  if (enteredOtp.length === totalOtpField && /^\d{6}$/.test(enteredOtp)) {
    handleSubmit();
  }
}, [otp]);

  return (
    <div className="w-full md:w-[480px] py-5">
   
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Two Factor Verification
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        Enter the 6 figure confirmation code shown on the email
      </div>

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
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={!isOtpComplete || loading}
          >
            {loading ? "Verifying..." : "Verify Now"}
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-muted-foreground">
          {resendTimer > 0 ? (
            <>Resend OTP in <span className="font-semibold">{  moment.utc(resendTimer * 1000).format("mm:ss")}</span></>
          ) : (
            <Button
              type="button"
              variant="link"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerfiyForm;
