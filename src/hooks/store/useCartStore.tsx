import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types";

type CartStore = {
  cartItems: CartItem[];

  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  getItem: (id: number) => CartItem | undefined;
  getTotalCartAmount: () => number;
  getItemTotalAmount: (id: number) => number;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      /* ADD TO CART (quantity = NEW ADDITION) */
      addToCart: (product) => {
        const existingItem = get().cartItems.find(
          (item) => item.id === product.id
        );
        console.log(existingItem, "existingItem in add to cart");
        if (existingItem) {
          const newQty = existingItem.quantity + product.quantity;

          if (newQty > product.stockQuantity) return;

          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id ? { ...item, cartQuantity: newQty } : item
            ),
          });
        } else {
          if (product.quantity > product.stockQuantity) return;
          console.log(product, "product in add to cart");
          set({
            cartItems: [...get().cartItems, product],
          });
        }
      },

      /* REMOVE ITEM COMPLETELY */
      removeFromCart: (productId) =>
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        }),

      /* +1 */
      increaseQty: (productId) =>
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === productId && item.quantity < item.stockQuantity
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      /* -1 */
      decreaseQty: (productId) =>
        set({
          cartItems: get()
            .cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      /* GET ITEM BY ID */
      getItem: (id) => get().cartItems.find((i) => i.id === id),

      /* GET TOTAL AMOUNT */
      getTotalCartAmount: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      /* GET TOTAL AMOUNT FOR A PARTICULAR ITEM */
      getItemTotalAmount: (id) => {
        const item = get().cartItems.find((i) => i.id === id);
        return item ? item.price * item.quantity : 0;
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
