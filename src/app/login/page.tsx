"use client"
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/common/SectionHeading"
import Button from "@/components/common/Button"
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineEyeOff,
} from "react-icons/hi"
import { useState } from "react";


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


export default function LoginPage() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    return(
        <>
        <main className="pt-[46px]">
            <section className="bg-[#FBF8F0] pt-[192px] pb-10 px-4">
                <div className="mx-auto w-full max-w-[680px] bg-white">

                    <div className="max-w-[552px] py-[49px] mx-auto">
                        {/* Heading */}
                        <SectionHeading
                        title="Welcome back!"
                        subtitle="Sign in to explore features, manage settings, and stay connected."
                        />

                        {/* Form */}
                        <form className="mt-12 space-y-6">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#1B1918]">
                            Email<span className="text-red-500">*</span>
                            </label>

                            <div className="relative">
                            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="
                                w-full border border-[#E5E5E5]
                                px-12 py-4
                                text-sm
                                focus:outline-none focus:border-[#094745]
                                "
                            />
                            </div>
                        </div>

                        {/* Password */}
                        {/* <div>
                            <label className="mb-2 block text-sm font-medium text-[#1B1918]">
                            Password<span className="text-red-500">*</span>
                            </label>

                            <div className="relative">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="
                                w-full border border-[#E5E5E5]
                                px-12 py-4 pr-12
                                text-sm
                                focus:outline-none focus:border-[#094745]
                                "
                            />
                            <HiOutlineEye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer" />
                            </div>
                        </div> */}
                        {/* Password */}
                        <PasswordField
                            label="Password"
                            required
                            placeholder="Enter your password"
                            show={showPassword}
                            toggle={() => setShowPassword(!showPassword)}
                        />

                        {/* Forgot password */}
                        <div className="text-right">
                            <a
                            // href="#"
                            className="text-sm text-[#094745] hover:underline"
                            >
                            Forgot your password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <Button
                            bgColor="bg-[#094745]"
                            textColor="text-white"
                            px="px-8"
                            py="py-4"
                            fontSize="text-sm"
                            className="w-full rounded-none"
                        >
                            LOG IN
                        </Button>

                        {/* Create account */}
                        <p className="text-center text-sm text-[#6B6B6B]">
                            New to JS International?{" "}
                            <a
                            // href="#"
                            className="font-medium text-[#094745]"
                             onClick={() => router.push("/account")}
                            >
                            Create Account
                            </a>
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#E5E5E5]" />
                            <span className="text-sm text-[#6B6B6B]">OR</span>
                            <span className="h-px flex-1 bg-[#E5E5E5]" />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#1B1918]">
                            Phone Number<span className="text-red-500">*</span>
                            </label>

                            <div className="relative flex items-center">
                            <HiOutlinePhone className="absolute left-4 text-gray-400 text-xl" />
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="
                                w-full border border-[#E5E5E5]
                                px-12 py-4
                                text-sm
                                focus:outline-none focus:border-[#094745]
                                "
                            />
                            <button
                                type="button"
                                className="absolute right-4 text-sm text-[#094745] font-medium"
                            >
                                Send OTP
                            </button>
                            </div>
                        </div>

                        {/* OTP Login Button */}
                        <Button
                            bgColor="bg-[#094745]"
                            textColor="text-white"
                            px="px-8"
                            py="py-4"
                            fontSize="text-sm"
                            className="w-full rounded-none"
                        >
                            LOGIN VIA OTP
                        </Button>

                        </form>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}