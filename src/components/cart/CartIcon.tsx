import { cn } from "@/lib/utils";
import React from "react";
import { LiaShoppingCartSolid } from "react-icons/lia";

interface CartBadgeProps {
  count: number;
}

const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  if (count <= 0) return null;

  return (
    <span
      className="
        absolute
        -top-[2px]
        -right-[2px]
        min-w-[14px]
        h-[14px]
        px-[3px]
        flex
        items-center
        justify-center
        rounded-full
        bg-[#f59e0b]
        text-white
        text-[9px]
        font-medium
        leading-none
      "
    >
      {count > 100 ? "100+" : count}
    </span>
  );
};

interface CartIconProps {
  itemCount: number;
  onClick?: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({
  itemCount,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-6 h-6 flex items-center justify-center cursor-pointer",
        className
      )}
    >
      <LiaShoppingCartSolid className="text-[20px] text-[#1B1918] hover:text-[#0f4a45] transition-colors" />

      <CartBadge count={itemCount} />
    </div>
  );
};

export default CartIcon;
