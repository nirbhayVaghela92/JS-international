"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button";
import Image from "next/image";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/store/useCartStore";
import { formatPrice } from "@/helpers/commonHelpers";

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const { cartItems, getTotalCartAmount } = useCartStore();
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {/* <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      /> */}

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          h-full
          w-full sm:max-w-212.5
          bg-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-[36px] font-serif text-[#094745]">
              Your Cart <sup>1</sup>
            </h2>
            <p className="mt-1 text-[18px] text-gray-600">
              Congrats! You&apos;re qualified for free shipping!
            </p>
          </div>

          <button onClick={onClose} className="text-red-500 text-xl">
            <Image
              className="w-10.5 h-10.5 cursor-pointer"
              src="/images/icons/close.png"
              alt="Shield image"
              width={54}
              height={54}
            />
          </button>
        </div>

        {/* Cart Item */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((product) => (
              <CartItem key={product.id} cartItemDetails={product} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[#1B1918] text-[20px] md:text-[36px]">
              Subtotal
            </h3>
            <p className="text-[30px] md:text-[40px] font-semibold text-[#094745]">
              Rs. {formatPrice(getTotalCartAmount())}
            </p>
          </div>

          <p className="text-sm text-[#1B1918] mb-6">
            MRP (Inclusive of all taxes) Shipping calculated at checkout.
          </p>

          <div className="flex  flex-col md:flex-row gap-4">
            <Button
              bgColor="bg-transparent"
              textColor="text-[#1B1918]"
              px="px-6"
              py="py-3"
              fontSize="text-sm"
              className="w-full md:w-1/2 border border-[#E7B250] cursor-pointer"
              onClick={() => {
                router.push("/#categories");
                onClose();
              }}
            >
              BUY MORE PRODUCTS
            </Button>

            <Button
              bgColor="bg-[#094745]"
              textColor="text-white"
              px="px-6"
              py="py-3"
              fontSize="text-sm"
              className="w-full md:w-1/2 cursor-pointer"
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
