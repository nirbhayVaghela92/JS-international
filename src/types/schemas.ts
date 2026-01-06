import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
  rememberMe: Yup.boolean().optional(),
});
export type SignInSchemaType = Yup.InferType<typeof signInSchema>;

export const registerSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export type registerSchemaType = Yup.InferType<typeof registerSchema>;

export const editProfileSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .nullable()
    .optional(),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .nullable()
    .optional(),
});
export type editProfileSchemaType = Yup.InferType<typeof editProfileSchema>;

export const contactSupportSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  phoneNumber: Yup.string().trim().required("Phone number is required"),

  query: Yup.string()
    .required("Please describe your query")
    // .min(10, "Query must be at least 10 characters")
    .max(1000, "Query must not exceed 1000 characters"),
});

export type contactSupportSchemaType = Yup.InferType<
  typeof contactSupportSchema
>;
