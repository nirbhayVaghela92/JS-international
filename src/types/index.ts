
export type Categories = "menWatches" | "womenWatches" | "purses" | "jewellery";

export type ProductSections = Categories | "WishList";
export interface Product {
    id: number;
    productId?: string;
    code?: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: Categories;
    stocks?: number;
    colorOptions?: string[];
    coverImageUrl?: string;
    images?: string[];
}