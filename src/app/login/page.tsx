"use client";
import { useRouter } from "next/navigation";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { useState } from "react";
import PasswordField from "@/components/common/PasswordField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "@/types/schemas";
import { useSignIn } from "@/hooks/queries/useAuth";
import InputField from "@/components/common/InputField";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: signIn, isPending } = useSignIn();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (values: SignInSchemaType) => {
    console.log(values, "values");
    await signIn({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <main className="pt-11.5">
        <section className="bg-[#FBF8F0] pt-48 pb-10 px-4">
          <div className="mx-auto w-full max-w-170 bg-white">
            <div className="max-w-138 py-12.25 mx-auto">
              {/* Heading */}
              <SectionHeading
                title="Welcome back!"
                subtitle="Sign in to explore features, manage settings, and stay connected."
              />

              {/* Form */}
              <form
                className="mt-12 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Email */}
                <InputField
                  label="Email"
                  required
                  icon={<HiOutlineMail />}
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                />

                {/* Password */}
                <PasswordField
                  label="Password"
                  required
                  placeholder="Enter your password"
                  show={showPassword}
                  toggle={() => setShowPassword(!showPassword)}
                  {...register("password")}
                  error={errors.password?.message}
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
                  isLoading={isPending}
                  type="submit"
                >
                  LOG IN
                </Button>

                {/* Create account */}
                <p className="text-center text-sm text-[#6B6B6B]">
                  New to JS International?{" "}
                  <a
                    // href="#"
                    className="font-medium text-[#094745] cursor-pointer"
                    onClick={() => router.push(routes.register)}
                  >
                    Create Account
                  </a>
                </p>

                {/* Login with OTP - Disabled for now */}
                {/* Divider */}
                {/* <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-[#E5E5E5]" />
                  <span className="text-sm text-[#6B6B6B]">OR</span>
                  <span className="h-px flex-1 bg-[#E5E5E5]" />
                </div> */}

                {/* Phone */}
                {/* <div>
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
                </div> */}

                {/* OTP Login Button */}
                {/* <Button
                  bgColor="bg-[#094745]"
                  textColor="text-white"
                  px="px-8"
                  py="py-4"
                  fontSize="text-sm"
                  className="w-full rounded-none"
                >
                  LOGIN VIA OTP
                </Button> */}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
