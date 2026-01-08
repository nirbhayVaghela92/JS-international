import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

export type CartItem = Product & {
  cartQuantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      /* ADD TO CART (quantity = NEW ADDITION) */
      addToCart: (product) => {
        const existingItem = get().items.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          const newQty =
            existingItem.cartQuantity + product.quantity;

          if (newQty > product.stocks) return;

          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, cartQuantity: newQty }
                : item
            ),
          });
        } else {
          if (product.quantity > product.stocks) return;

          set({
            items: [
              ...get().items,
              { ...product, cartQuantity: product.quantity },
            ],
          });
        }
      },

      /* REMOVE ITEM COMPLETELY */
      removeFromCart: (productId) =>
        set({
          items: get().items.filter(
            (item) => item.id !== productId
          ),
        }),

      /* +1 */
      increaseQty: (productId) =>
        set({
          items: get().items.map((item) =>
            item.id === productId &&
            item.cartQuantity < item.stocks
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        }),

      /* -1 */
      decreaseQty: (productId) =>
        set({
          items: get()
            .items
            .map((item) =>
              item.id === productId
                ? { ...item, cartQuantity: item.cartQuantity - 1 }
                : item
            )
            .filter((item) => item.cartQuantity > 0),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
