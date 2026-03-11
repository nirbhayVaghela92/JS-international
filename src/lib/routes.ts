export const routes = {
  home: "/",
  signIn: "/login",
  register: "/register",
  editUserDetails: "/edit-profile",
  product: "/products",
  productDetails: (productSlug) => `/products/${productSlug}`,
  wishList: "/wish-list",
  menWatches: "/men-watches",
  womenWatches: "/women-watches",
  purses: "/purses",
  jewellery: "/jewellery",
  contactSupport: "/contact-support",
  watches: "/watches",
  forgotPassword: "/forgot-password", 
  verifyOtp: "/verify-otp",
  resetPassword: "/reset-password",
  orders: "/orders",
  orderView: (orderId) => `/orders/${orderId}`,
  // featuredCollections:"/featured-collections",
  // sale:"/sale"
};

export const publicRoutes: string[] = [
  "/",
  "/products",
  routes.forgotPassword,
  routes.verifyOtp,
  routes.resetPassword,
  routes.signIn,
  routes.register,
  routes.product,
  routes.menWatches,
  routes.womenWatches,
  routes.purses,
  routes.jewellery,
  routes.contactSupport,
  routes.watches,
];

export const protectedRoutes: string[] = [routes.editUserDetails , routes.wishList, routes.orders];
