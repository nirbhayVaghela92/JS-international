"use client";

import { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, registerSchemaType } from "@/types/schemas";
import { useRegister } from "@/hooks/queries";
import { routes } from "@/lib/routes";

export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { mutateAsync: registerUser, isPending } = useRegister();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (values: registerSchemaType) => {
    // console.log(values, "values");
    await registerUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
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
                title="Create Your Account"
                subtitle="It just takes a minute — set up your profile and get started."
              />

              {/* Form */}
              <form
                className="mt-12 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="First Name"
                    required
                    icon={<HiOutlineUser />}
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <InputField
                    label="Last Name"
                    required
                    icon={<HiOutlineUser />}
                    placeholder="Enter your last name"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                  />
                </div>

                <InputField
                  label="Email"
                  required
                  icon={<HiOutlineMail />}
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                />

                <InputField
                  label="Phone Number"
                  required
                  type="phoneNumber"
                  icon={<HiOutlinePhone />}
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />
                {/* 
                <InputField
                  label="OTP"
                  required
                  icon={<span className="text-sm font-semibold">***</span>}
                  placeholder="Enter your OTP"
                /> */}

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

                {/* Confirm Password */}
                <PasswordField
                  label="Confirm Password"
                  required
                  placeholder="Enter your confirm password"
                  show={showConfirmPassword}
                  toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                {/* Submit */}
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
                  CREATE ACCOUNT
                </Button>

                {/* Login link */}
                <p
                  className="text-center text-sm text-[#6B6B6B]"
                  onClick={() => router.push("/login")}
                >
                  Already have an account?{" "}
                  <a
                    className="font-medium text-[#094745] cursor-pointer"
                    onClick={() => router.push(routes.signIn)}
                  >
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
