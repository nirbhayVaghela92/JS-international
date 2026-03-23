import { getOrders } from "@/services";
import { productDetails } from "@/services/product.service";

export const API = {
  signin: "/auth/login",
  register: "/auth/register",
  updateProfile: "/edit-profile",

  // Product's API
  productList: "/products",
  productDetails: (slug:string) => `/product/${slug}`,
  toggleWishList: "/wishlist/toggle",
  // sendForgotPasswordOtp: "/admin/forgot-password/send-otp",
  // verifyForgotPasswordOtp: "/admin/forgot-password/verify-otp",
  // resetPassword: "/admin/forgot-password/update-password",
  // changePassword: "/admin/account-settings/change-password",

  // create order
  createOrder: "/create-order",
  listOrders: "/my-orders",

  // submit contact query
  submitContactQuery: "/submit-query",
};
