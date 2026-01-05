"use client";
import {Suspense } from "react";

import VerfiyForm from "@/components/auth/verify-form";
import AuthBg from "@/components/auth/auth-bg";

const VerifyPage = () => {
  return (
    <Suspense>
      <div className="min-h-screen bg-card  flex items-center  overflow-hidden w-full">
        <div className="lg-inner-column flex w-full flex-wrap justify-center overflow-y-auto">
        <AuthBg />
          <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 flex justify-center items-center">
            <div className="lg:w-[480px]">
              <VerfiyForm  />
            </div>
          </div>
        </div>
      </div>
  
    </Suspense>
  );
};

export default VerifyPage;
