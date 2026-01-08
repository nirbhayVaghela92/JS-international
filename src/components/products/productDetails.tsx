"use client";

import { useState, useRef } from "react";
import Button from "@/components/common/Button";
import { FiChevronUp, FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Image from "next/image";
import { useCartStore } from "@/hooks/store/useCartStore";

const images = [
  "/images/productDetail/p1.png",
  "/images/productDetail/p2.png",
  "/images/productDetail/p3.png",
  "/images/productDetail/p4.png",
];

const colors = [
  { id: 1, color: "#E5E5E5" },
  { id: 2, color: "#E7B250" },
  { id: 3, color: "#094745" },
];

const stocks = 5;

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(colors[0].id);
  const thumbRef = useRef(null);
  const { addToCart } = useCartStore();

  const scrollUp = () => {
    thumbRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  };

  const scrollDown = () => {
    thumbRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    addToCart({
      id: 1, 
      name: "Minuit Watch Mesh, White, Silver Colour",
      imageUrl: activeImage,
      category: "menWatches",
      code: "CW010203002",
      price: 9405,
      colorOptions: [activeColor.toString()],
      quantity: qty,
      stocks: stocks,
    });
  };

  return (
    <section className="py-20">
      <div className="cus-container">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]"> */}
        <div className="flex flex-col lg:flex-row gap-4.5">
          {/* LEFT : IMAGE GALLERY */}
          <div className="flex flex-col md:flex-row gap-6 max-w-207.5 w-full">
            {/* Thumbnails */}
            <div className="flex flex-col items-center gap-4">
              <button onClick={scrollUp} className="text-xl hidden md:block">
                <FiChevronUp />
              </button>

              <div
                ref={thumbRef}
                className="flex md:flex-col gap-2 md:gap-4 max-h-155 overflow-hidden"
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 sm:w-30 md:w-35 lg:w-full lg:max-w-35 bg-gray-100 border
                      ${
                        activeImage === img
                          ? "border-[#094745]"
                          : "border-transparent"
                      }
                    `}
                  >
                    <Image
                      width={140}
                      height={140}
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>

              <button onClick={scrollDown} className="text-xl hidden md:block">
                <FiChevronDown />
              </button>
            </div>

            {/* Main Image */}
            <div className="w-full max-w-166.25">
              <Image
                src={activeImage}
                alt="Product"
                className=" w-full"
                width={665}
                height={665}
              />
            </div>
          </div>

          {/* RIGHT : PRODUCT INFO */}
          <div className="max-w-155.5">
            <h1 className="text-3xl font-sans font-bold text-[#094745]">
              Minuit Watch Mesh, White, Silver Colour
            </h1>

            <p className="mt-2 text-sm text-gray-500">CW010203002</p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[32px] font-semibold text-[#094745]">
                Rs. 9,405
              </span>
              <span className="text-[32px] text-gray-400 line-through">
                Rs. 9,405
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              MRP (Inclusive of all taxes)
            </p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-1 text-[#E7B250]">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.5 · 174 Ratings & 22 Reviews
              </span>
            </div>

            <hr className="my-8" />

            {/* Color Options */}
            <div>
              <p className="mb-4 font-medium">Color Options:</p>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveColor(c.id)}
                    className={`w-10 h-10 rounded-full border-2
                      ${
                        activeColor === c.id
                          ? "border-[#094745]"
                          : "border-transparent"
                      }
                    `}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex gap-4">
              <div className="flex items-center border px-6 gap-6">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="cursor-pointer "
                >
                  <FiMinus />
                </button>
                <span className="block sm:px-5 ">{qty}</span>
                <button
                  onClick={() => setQty(qty < stocks ? qty + 1 : qty)}
                  className="cursor-pointer h-full "
                >
                  <FiPlus />
                </button>
              </div>

              <Button
                bgColor="bg-[#094745]"
                textColor="text-white"
                px="px-10"
                py="py-4"
                fontSize="text-sm"
                className="flex-1"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <BsBoxSeam className="text-[#E7B250]" />
                Estimated Delivery : 15 Dec – 17 Dec 2025
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineClockCircle className="text-[#E7B250]" />
                Only 10 left in stock. Order soon!
              </div>
            </div>

            <hr className="my-8" />

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm text-gray-600">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/icons/world-wide.png"
                  alt="World image"
                  width={54}
                  height={54}
                />
                <p>World Wide Free Shipping</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/icons/quality.png"
                  alt="Quality image"
                  width={54}
                  height={54}
                />
                <p>
                  Assured <br /> Quality
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/icons/handcrafted.png"
                  alt="Handcraft image"
                  width={54}
                  height={54}
                />
                <p>
                  Handcrafted <br /> Detailing
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/images/icons/shield.png"
                  alt="Shield image"
                  width={54}
                  height={54}
                />
                <p>
                  100% Secured <br /> Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
