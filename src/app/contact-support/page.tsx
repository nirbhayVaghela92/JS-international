"use client";

import { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import InputField from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSupportSchema, contactSupportSchemaType } from "@/types/schemas";
import { useSubmitContactQuery } from "@/hooks/queries";

export default function ContactSupportPage() {
  const router = useRouter();
  const { mutateAsync: submitQuery, isPending } = useSubmitContactQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      query: "",
    },
    resolver: yupResolver(contactSupportSchema),
  });

  const onSubmit = async (values: contactSupportSchemaType) => {
    await submitQuery({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      query: values.query,
    });
    reset(); // Reset form after successful submission
  };

  return (
    <>
      <main className="pt-11.5">
        <section className="bg-[#FBF8F0] pt-48 pb-10 px-4">
          <div className="mx-auto w-full max-w-170 bg-white">
            <div className="max-w-138 py-12.25 mx-auto">
              {/* Heading */}
              <SectionHeading
                title="Contact Support"
                subtitle="Have a question or need assistance? Send us a message and we'll get back to you as soon as possible."
              />

              {/* Form */}
              <form
                className="mt-12 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Name */}
                <InputField
                  label="Full Name"
                  required
                  icon={<HiOutlineUser />}
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  {...register("name")}
                />

                {/* Email */}
                <InputField
                  label="Email"
                  required
                  icon={<HiOutlineMail />}
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                />

                {/* Phone Number */}
                <InputField
                  label="Phone Number"
                  required
                //   pattern="[0-9+\-\s()]{7,}"
                  type="phoneNumber"
                  icon={<HiOutlinePhone />}
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />

                {/* Query/Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Query <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your issue or question in detail..."
                    className={`w-full px-4 py-3 border ${
                      errors.query ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#094745] focus:border-transparent resize-none`}
                    {...register("query")}
                  />
                  {errors.query && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.query.message}
                    </p>
                  )}
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
                    SUBMIT QUERY
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