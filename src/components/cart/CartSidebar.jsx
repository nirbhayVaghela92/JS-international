"use client"

import { useEffect } from "react"
import Button from "@/components/common/Button"
import {
  FiX,
  FiTrash2,
  FiMinus,
  FiPlus,
} from "react-icons/fi"
import Image from "next/image"

export default function CartSidebar({ isOpen, onClose }) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          h-full
          w-full sm:max-w-[850px]
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
              Your Cart <sup className="text-sm">1</sup>
            </h2>
            <p className="mt-1 text-[18px] text-gray-600">
              Congrats! You're qualified for free shipping!
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            <FiX />
          </button>
        </div>

        {/* Cart Item */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between pb-6 border-b">

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Image */}
              <Image
              src="/images/productDetail/p1.png"
              width={140}
              height={140}
              alt="product image"            
              />

              {/* Details */}
              <div className="flex-1">
                <h4 className="font-medium max-w-[316px] text-[18px] text-[#1B1918]">
                  Minuit Watch Mesh, White, Silver Colour
                </h4>

                <p className="mt-3 text-[16px] text-gray-500 flex items-center gap-2">
                  Color Options:
                  <span className="w-[36px] h-[36px] rounded-full bg-[#dddddd]" />
                </p>
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="flex flex-col items-end gap-[33px]">
              <div className="flex gap-1">
                <button className="text-red-500">
                  <FiTrash2 />
                </button>

                <div className="flex items-center border px-3 py-2 gap-4 text-[#1B1918]">
                  <button><FiMinus /></button>
                  <span>1</span>
                  <button><FiPlus /></button>
                </div>
              </div>

              <p className="font-semibold text-[20px] text-[#094745]">
                Rs. 9,405
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[#1B1918] text-[20px] md:text-[36px]">Subtotal</h3>
            <p className="text-[30px] md:text-[40px] font-semibold text-[#094745]">
              Rs. 9,405
            </p>
          </div>

          <p className="text-sm text-[#1B1918] mb-6">
            MRP (Inclusive of all taxes) Shipping calculated at checkout.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <Button
              bgColor="bg-transparent"
              textColor="text-[#1B1918]"
              px="px-6"
              py="py-3"
              fontSize="text-sm"
              className="w-full md:w-1/2 border border-[#E7B250]"
            >
              VIEW CART
            </Button>

            <Button
              bgColor="bg-[#094745]"
              textColor="text-white"
              px="px-6"
              py="py-3"
              fontSize="text-sm"
              className="w-full md:w-1/2"
            >
              CHECKOUT
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
