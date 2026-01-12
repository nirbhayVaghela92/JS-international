/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/common/Button";
import { FiChevronUp, FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Image from "next/image";
import { useCartStore } from "@/hooks/store/useCartStore";
import { products } from "@/lib/data";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { formatPrice, getFullImageUrl } from "@/helpers/commonHelpers";
import CartQuantityActions from "../cart/CartQuantityActions";
import { useProductDetails } from "@/hooks/queries/useProduct";
import { cn } from "@/lib/utils";

export default function ProductDetails() {
  const { productSlug } = useParams();
  // const productDetail = products.find((p) => p.id === Number(productId));
  const [activeVariant, setActiveVariant] = useState(null);
  const { data: productDetail } = useProductDetails(String(productSlug));
  const totalStock = productDetail?.variants?.reduce(
  (total, variant) => total + (variant.stock || 0),
  0
) || 0;
  const [activeImage, setActiveImage] = useState();
  const [activeColor, setActiveColor] = useState("#094745");
  const thumbRef = useRef(null);
  const { getItem, addToCart } = useCartStore();

  const cartItem = getItem(Number(productDetail?.product?.id));

  const scrollUp = () => {
    thumbRef.current?.scrollBy({ top: -120, behavior: "smooth" });
  };

  const scrollDown = () => {
    thumbRef.current?.scrollBy({ top: 120, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    addToCart({
      ...productDetail,
      quantity: 1,
      selectedColorOptions: activeColor,
    });
  };

  useEffect(() => {
    if (productDetail?.images?.length > 0) {
      setActiveImage(productDetail.images[0]?.image_url);
    }
  }, [productDetail]);

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
                // className="flex md:flex-col gap-2 md:gap-4 max-h-155 overflow-hidden"
                className="
                    flex md:flex-col
                    gap-3 md:gap-4
                    max-h-155
                    overflow-y-auto
                    px-1
                  "
              >
                {productDetail?.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img?.image_url)}
                    className={`
                        relative
                        w-20 sm:w-24 md:w-28 lg:w-full lg:max-w-28
                        aspect-square
                        rounded-md
                        bg-white
                        overflow-hidden
                        transition-all
                        duration-200
                        cursor-pointer
                        ${
                          activeImage === img?.image_url
                            ? "ring-2 ring-[#094745]"
                            : "ring-1 ring-gray-300"
                        }
                      `}
                  >
                    <Image
                      width={140}
                      height={140}
                      src={getFullImageUrl(img?.image_url)}
                      alt={productDetail?.product?.name || "Product"}
                      className="w-full h-full object-contain p-3"
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
                src={getFullImageUrl(activeImage)}
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
              {productDetail?.product?.name}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {productDetail?.product?.code}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[32px] font-semibold text-[#094745]">
                Rs. {formatPrice(Number(productDetail?.product?.price))}
              </span>
              {/* <span className="text-[32px] text-gray-400 line-through">
                Rs. {formatPrice(productDetail?.oldPrice)}
              </span> */}
            </div>

            <p className="mt-1 text-sm text-gray-500">
              MRP (Inclusive of all taxes)
            </p>

            {/* Rating */}
            {/* <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-1 text-[#E7B250]">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                4.5 · 174 Ratings & 22 Reviews
              </span>
            </div> */}

            <hr className="my-4" />

            {/* Color Options */}
            <div>
              <p className="mb-4 font-medium">Color Options:</p>

              <div className="flex gap-4">
                {productDetail?.variants?.map((variant) => {
                  const isActive = activeVariant?.id === variant.id;
                  const isOutOfStock = variant.stock === 0;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => !isOutOfStock && setActiveVariant(variant)}
                      disabled={isOutOfStock}
                      className={cn(
                        "relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer",
                        isOutOfStock && "opacity-40 cursor-not-allowed"
                      )}
                    >
                      {/* OUTER GREEN RING (only when active) */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-black" />
                      )}

                      {/* WHITE PADDING RING */}
                      <span
                        className={cn(
                          "flex items-center justify-center rounded-full bg-white",
                          isActive ? "w-10 h-10" : "w-11 h-11"
                        )}
                      >
                        {/* ACTUAL COLOR CIRCLE */}
                        <span
                          className="w-10 h-10 rounded-full"
                          style={{ backgroundColor: variant.color }}
                        />
                      </span>

                      {/* OUT OF STOCK SLASH */}
                      {isOutOfStock && (
                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="w-full h-0.5 bg-white rotate-45" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {activeVariant && (
                <p className="mt-3 text-sm">
                  {activeVariant.stock > 0 ? (
                    <span className="text-green-700">
                      {activeVariant.stock} left in stock for{" "}
                      <strong>{activeVariant.color}</strong>
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Out of stock for <strong>{activeVariant.color}</strong>
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex gap-4">
              {!cartItem ? (
                /* ADD TO CART */
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
              ) : (
                /* QUANTITY CONTROLS */
                <CartQuantityActions
                  cartId={cartItem.id}
                  quantity={cartItem.quantity}
                  stockQuantity={productDetail.stockQuantity}
                />
              )}
            </div>

            {/* Delivery Info */}
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <BsBoxSeam className="text-[#E7B250]" />
                {/* Estimated Delivery : 15 Dec – 17 Dec 2025 */}
                Estimated Delivery: 10 Business Days
              </div>

              <div className="flex items-center gap-3">
                <AiOutlineClockCircle className="text-[#E7B250]" />
                {totalStock} left in stock. Order soon!
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
