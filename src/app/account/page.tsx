"use client";

import { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { useRouter } from 'next/navigation';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

function InputField({ label, required, icon, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1B1918]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          {icon}
        </span>

        <input
          type="text"
          placeholder={placeholder}
          className="
            w-full border border-[#E5E5E5]
            px-12 py-4
            text-sm
            focus:outline-none focus:border-[#094745]
          "
        />
      </div>
    </div>
  );
}

function PasswordField({ label, required, placeholder, show, toggle }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1B1918]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="
            w-full border border-[#E5E5E5]
            px-12 py-4 pr-12
            text-sm
            focus:outline-none focus:border-[#094745]
          "
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
        >
          {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();


  return (
    <>
      <main className="pt-[46px]">
        <section className="bg-[#FBF8F0] pt-[192px] pb-10 px-4">
          <div className="mx-auto w-full max-w-[680px] bg-white">
            <div className="max-w-[552px] py-[49px] mx-auto">
              {/* Heading */}
              <SectionHeading
                title="Create Your Account"
                subtitle="It just takes a minute — set up your profile and get started."
              />

              {/* Form */}
              <form className="mt-12 space-y-6">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    required
                    icon={<HiOutlineUser />}
                    placeholder="Enter your first name"
                  />
                  <InputField
                    label="Last Name"
                    required
                    icon={<HiOutlineUser />}
                    placeholder="Enter your last name"
                  />
                </div>

                <InputField
                  label="Email"
                  required
                  icon={<HiOutlineMail />}
                  placeholder="Enter your email"
                />

                <InputField
                  label="Phone Number"
                  required
                  icon={<HiOutlinePhone />}
                  placeholder="Enter your phone number"
                />

                <InputField
                  label="OTP"
                  required
                  icon={<span className="text-sm font-semibold">***</span>}
                  placeholder="Enter your OTP"
                />

                {/* Password */}
                <PasswordField
                  label="Password"
                  required
                  placeholder="Enter your password"
                  show={showPassword}
                  toggle={() => setShowPassword(!showPassword)}
                />

                {/* Confirm Password */}
                <PasswordField
                  label="Confirm Password"
                  required
                  placeholder="Enter your confirm password"
                  show={showConfirmPassword}
                  toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                {/* Submit */}
                <Button
                  bgColor="bg-[#094745]"
                  textColor="text-white"
                  px="px-8"
                  py="py-4"
                  fontSize="text-sm"
                  className="w-full rounded-none"
                 
                >
                  CREATE ACCOUNT
                </Button>

                {/* Login link */}
                <p className="text-center text-sm text-[#6B6B6B]" onClick={() => router.push('/login')}>
                  Already have an account?{" "}
                  <a  className="font-medium text-[#094745]" >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
