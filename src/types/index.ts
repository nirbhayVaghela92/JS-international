
export type Categories = "menWatches" | "womenWatches" | "purses" | "jewellery";

export type ProductSections = Categories | "WishList" | "watches" | "all";
export interface Product {
    id: number;
    // productId?: string;
    code?: string;
    name: string;
    description?: string;
    price: number;
    oldPrice?: number;
    category: Categories;
    quantity?: number; // For cart items
    stockQuantity?: number;
    colorOptions?: string[];
    coverImageUrl?: string;
    images?: string[];
}

export interface CartItem extends Product {
  selectedColorOptions: string;
};
