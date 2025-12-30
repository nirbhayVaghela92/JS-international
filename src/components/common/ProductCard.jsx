"use client";

import { useState } from "react";
import Image from "next/image";
import { PiHeart } from "react-icons/pi";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  return (
    <div className=" text-white p-2.5">
      {/* Image */}
      <div className="relative bg-gray-100">
        <button
          onClick={() => setLiked(!liked)}
          className="absolute right-4 top-4"
        >
          <PiHeart
            className={`text-xl transition ${
              liked ? "fill-[#0f4a45] text-[#0f4a45]" : "text-gray-400"
            }`}
          />
        </button>

        <Image
          src={product.image}
          alt={product.title}
          width={375}
          height={375}
          className="mx-auto h-[375px] w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="py-4 text-left">
        <h3 className="text-[20px] text-black font-medium leading-snug sm:min-h-[82px] xl:min-h-[56px]">
          {product.title}
        </h3>

        <p className="mt-1 text-xs text-gray-400">{product.code}</p>

        {/* Price */}
        <div className="mt-3 flex items-center gap-3">
          <span className="font-semibold text-[#0f4a45]">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.oldPrice}
          </span>
        </div>
      </div>

      {/* Button */}
      <Button
        bgColor="bg-[#0f4a45]"
        textColor="text-white"
        fontSize="text-sm"
        className="w-full rounded-none font-medium cursor-pointer"
        onClick={() => router.push("/detail")}
      >
        SHOP NOW
      </Button>
    </div>
  );
}
