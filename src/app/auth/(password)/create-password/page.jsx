"use client";

import { Suspense } from 'react'
import AuthBg from "@/components/auth/auth-bg";
import CreatePasswordForm from "./create-password-form";

const CreatePasswordPage = () => {
  return (
    <Suspense>
      <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
       <AuthBg />
          <div className=" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px] ">
              <CreatePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default CreatePasswordPage;
