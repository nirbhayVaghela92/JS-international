import Image from "next/image";
import { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = () => {
  const [qty, setQty] = useState(1);
  const stocks = 5;
  
  return (
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
          <h4 className="font-medium max-w-79 text-[18px] text-[#1B1918]">
            Minuit Watch Mesh, White, Silver Colour
          </h4>

          <p className="mt-3 text-[16px] text-gray-500 flex items-center gap-2">
            Color Options:
            <span className="w-9 h-9 rounded-full bg-[#dddddd]" />
          </p>
        </div>
      </div>

      {/* Quantity + Price */}
      <div className="flex flex-col items-end gap-8.25">
        <div className="flex gap-2">
          <button className="text-red-500 cursor-pointer">
            <FiTrash2 />
          </button>

          <div className="flex items-center border px-3 py-2 gap-4 text-[#1B1918]">
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
        </div>

        <p className="font-semibold text-[20px] text-[#094745]">Rs. 9,405</p>
      </div>
    </div>
  );
};

export default CartItem;
