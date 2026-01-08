// export const routes= {
//     signIn : "/login",
//     register : "/register",
//     product: "/products",
//     productDetails: (id) => `/products/${id}`,
//     menWatches:"/men-watches",
//     womenWatches:"/women-watches",
//     purses:"/purses",
//     // featuredCollections:"/featured-collections",
//     // sale:"/sale"
//   }
export const routes = {
  home: "/",
  signIn: "/login",
  register: "/register",
  editUserDetails: "/edit-profile",
  product: "/products",
  productDetails: (id) => `/products/${id}`,
  wishList: "/wish-list",
  menWatches: "/men-watches",
  womenWatches: "/women-watches",
  purses: "/purses",
  jewellery: "/jewellery",
  contactSupport: "/contact-support",
  // featuredCollections:"/featured-collections",
  // sale:"/sale"
};

export const publicRoutes: string[] = [
  "/",
  "/products",
  routes.signIn,
  routes.register,
  routes.product,
  routes.menWatches,
  routes.womenWatches,
  routes.purses,
  routes.jewellery,
  routes.contactSupport
];

export const protectedRoutes: string[] = [routes.editUserDetails , routes.wishList];
