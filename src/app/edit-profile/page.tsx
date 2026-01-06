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
import { editProfileSchema, editProfileSchemaType } from "@/types/schemas";
import { useUpdateProfile } from "@/hooks/queries";
import { useGetAuthDetails } from "@/hooks/useGetAuthDetails";

export default function EditProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const { user} = useGetAuthDetails();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      password: null,
      confirmPassword: null,
    },
    resolver: yupResolver(editProfileSchema),
  }); 

  const onSubmit = async (values: editProfileSchemaType) => {
    await updateProfile({
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
                title="Edit Your Profile"
                subtitle="Update your personal information and account settings."
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
                  // pattern="[0-9+\-\s()]{7,}"
                  type="phoneNumber"
                  icon={<HiOutlinePhone />}
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />

                {/* Password Section */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Change Password (Optional)
                  </h3>

                  {/* New Password */}
                  <div className="space-y-6">
                    <PasswordField
                      label="New Password"
                      placeholder="Enter new password"
                      show={showPassword}
                      toggle={() => setShowPassword(!showPassword)}
                      {...register("password")}
                      error={errors.password?.message}
                    />

                    {/* Confirm Password */}
                    <PasswordField
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      show={showConfirmPassword}
                      toggle={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4">
                  <Button
                    bgColor="bg-[#094745]"
                    textColor="text-white"
                    px="px-8"
                    py="py-4"
                    fontSize="text-sm"
                    className="flex-1 rounded-none"
                    isLoading={isPending}
                    type="submit"
                  >
                    UPDATE PROFILE
                  </Button>

                  <Button
                    bgColor="bg-gray-200"
                    textColor="text-gray-700"
                    px="px-8"
                    py="py-4"
                    fontSize="text-sm"
                    className="rounded-none"
                    type="button"
                    onClick={() => router.back()}
                  >
                    CANCEL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


