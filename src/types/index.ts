import { filterOptions } from "@/lib/data";

export type Categories = "menWatches" | "womenWatches" | "purses" | "jewellery";

export type ProductSections = Categories | "WishList" | "watches" | "all";

export type ProductFilters = ProductSections | "bestSeller" | "newArrival"
export interface ProductVariant {
  id: number;
  color: string;
  stock: number;
  hexCode: string;
}

export interface Product {
  id: number;
  code?: string;

  name: string;
  description?: string;

  price: number;
  oldPrice?: number;

  category: Categories;

  coverImageUrl?: string;
  images?: string[];

  variants: ProductVariant[]; 
}


export interface CartItem {
  productId: number;
  variantId: number;

  name: string;
  code?: string;
  price: number;
  coverImageUrl?: string;

  variantName: string;
  hexCode: string;

  quantity: number;
  stockQuantity: number;
}


// Product API Filters
export type SortOrder = "ASC" | "DESC";

export type ProductFilterCategory =
  | "watches-men"
  | "watches-women"
  | "purse"
  | "jewellery";
  
export interface ProductListParams {
  category?: ProductFilterCategory;
  bestSeller?: boolean;
  newArrival?: boolean;
  wishList?: boolean;
  search?: string;

  price_sort?: SortOrder;
  arrival_sort?: SortOrder;

  page?: number;
  limit?: number;
}

export type FilterOptionKey = typeof filterOptions[number]["key"];

export type CheckoutItem = {
  product_id: number;
  variant_id: number | null;
  quantity: number;
};

export type CheckoutRequestType = {
  items: CheckoutItem[];
  payment_method: "razorpay";
};