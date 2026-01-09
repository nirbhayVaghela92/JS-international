import { useCartStore } from "@/hooks/store/useCartStore";
import type { CartItem } from "@/types";
import Image from "next/image";
import { FC } from "react";
import { FiTrash2 } from "react-icons/fi";
import CartQuantityActions from "./CartQuantityActions";
import { formatPrice } from "@/helpers/commonHelpers";

interface CartItemProps {
  cartItemDetails: CartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItemDetails }) => {
  const { removeFromCart, getItemTotalAmount } = useCartStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b min-h-[180px]">
      {/* Left */}
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={cartItemDetails.coverImageUrl}
          width={140}
          height={140}
          className="object-cover flex-shrink-0"
          alt={cartItemDetails.name}
        />

        <div className="flex-1">
          <h4 className="font-medium text-[18px] text-[#1B1918]">
            {cartItemDetails.name}
          </h4>

          <p className="mt-3 text-[16px] text-gray-500 flex items-center gap-2">
            Color Options:
            <span
              style={{ backgroundColor: cartItemDetails.selectedColorOptions }}
              className="w-9 h-9 rounded-full border"
            />
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2 justify-between items-end h-full mt-4 md:mt-0">
        <div className="flex gap-3 items-center">
          <button
            className="text-red-500"
            onClick={() => removeFromCart(cartItemDetails.id)}
          >
            <FiTrash2 />
          </button>

          <CartQuantityActions
            cartId={cartItemDetails.id}
            quantity={cartItemDetails.quantity}
            stockQuantity={cartItemDetails.stockQuantity}
          />
        </div>

        <p className="font-semibold text-[20px] text-[#094745]">
          Rs. {formatPrice(getItemTotalAmount(cartItemDetails.id))}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
