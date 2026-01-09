"use client";

// import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { FaInstagram } from "react-icons/fa6";
import { TbBrandFacebook } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { PiYoutubeLogo } from "react-icons/pi";
import { TbBrandLinkedin } from "react-icons/tb";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { PiHeart } from "react-icons/pi";
import "./header.css";
import CartSidebar from "@/components/cart/CartSidebar";
import { routes } from "@/lib/routes";
import { SearchBar } from "./SearchBar";
import { useGetAuthDetails } from "@/hooks/useGetAuthDetails";
import CartIcon from "@/components/cart/CartIcon";
import { useCartStore } from "@/hooks/store/useCartStore";

export default function TopHeader() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { cartItems } = useCartStore();
  const { isAuthenticated, user } = useGetAuthDetails();

  return (
    <div className="w-full text-white fixed top-0 z-10">
      <div className="bg-[#0f4a45] py-2.75">
        <div className="cus-container">
          <div className="flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between text-sm">
            <p className="text-center font-normal text-[14px] md:text-[16px]">
              Get 5% Extra Discount On Prepaid Orders for orders above Rs. 1000
            </p>

            <div className="items-center gap-4 flex social-icons">
              <Link href="#">
                <FaInstagram className="text-xl md:text-2xl" />
              </Link>
              <Link href="#">
                <TbBrandFacebook className="text-xl md:text-2xl" />
              </Link>
              <Link href="#">
                <FaXTwitter className="text-xl md:text-2xl" />
              </Link>
              <Link href="#">
                <PiYoutubeLogo className="text-xl md:text-2xl" />
              </Link>
              <Link href="#">
                <TbBrandLinkedin className="text-xl md:text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <header className="mt-7">
        <div className="cus-container">
          <div className="flex items-center justify-between bg-white">
            {/* 🔹 Logo */}
            <div className="flex items-center gap-3 p-5 pr-0">
              <Link href="/" className="cursor-pointer">
                <Image
                  src="/images/common/logo.png" // you will add image
                  alt="JS International"
                  width={340}
                  height={69}
                  className="h-auto w-35 md:w-45 xl:w-85"
                />
              </Link>
            </div>

            <div className="flex lg:gap-7.5 xl:gap-20.5">
              {/* 🔹 Desktop Menu */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium">
                <Link
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                  href="/#new-arrivals"
                >
                  New Arrivals
                </Link>

                {/* Dropdown */}
                <div className="group relative cursor-pointer">
                  <div className="flex items-center gap-1 text-[#1B1918] hover:text-[#0f4a45]">
                    Watches <FiChevronDown className="text-sm" />
                  </div>

                  <div className="absolute left-0 top-full hidden w-48 bg-white shadow-lg group-hover:block">
                    <Link
                      className="block px-4 py-3 text-[#1B1918] hover:bg-gray-100"
                      href={routes.menWatches}
                    >
                      Men&apos;s Watches
                    </Link>
                    <Link
                      className="block px-4 py-3 text-[#1B1918] hover:bg-gray-100"
                      href={routes.womenWatches}
                    >
                      Women&apos;s Watches
                    </Link>
                  </div>
                </div>

                <Link
                  href={routes.purses}
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                >
                  Purses
                </Link>
                <Link
                  href={routes.jewellery}
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                >
                  Jewellery
                </Link>
                {/* <Link
                  href="#"
                  className="text-[#1B1918] hover:text-[#0f4a45] proved"
                >
                  Featured Collections
                </Link>
                <Link href="#" className="text-[#1B1918] hover:text-[#0f4a45]">
                  Sale
                </Link> */}
              </nav>

              {/* 🔹 Icons */}
              <div className="flex items-center gap-3 md:gap-5 bg-[#f7ecd6] px-3 md:px-6 py-7 md:py-11">
                {/* Search icon slot (same size as other icons) */}
                <SearchBar className="w-6! h-6!" />

                <CartIcon
                  className="w-6! h-6!"
                  itemCount={cartItems.length}
                  onClick={() => setCartOpen(true)}
                />

                <PiHeart
                  className="w-6! h-6! text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]"
                  onClick={() => router.push(routes.wishList)}
                />

                {/* <FiUser
                  className="text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]"
                  onClick={() => router.push(routes.signIn)}
                /> */}
                <FiUser
                  className="w-6! h-6! text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]"
                  onClick={() =>
                    router.push(
                      isAuthenticated ? routes.editUserDetails : routes.signIn
                    )
                  }
                />

                <button
                  className="lg:hidden text-2xl shrink-0 text-[#1B1918] cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <FiX /> : <FiMenu />}
                </button>
              </div>
            </div>
          </div>

          <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

          {/* 🔹 Mobile Menu */}
          {open && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <nav className="flex flex-col gap-4 py-4 pl-4 font-medium">
                <Link
                  className="text-[#1B1918] hover:text-[#0f4a45] cursor-pointer!"
                  href="/#new-arrivals"
                >
                  New Arrivals
                </Link>
                <Link
                  href={routes.menWatches}
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                >
                  Watches
                </Link>
                <Link
                  href={routes.purses}
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                >
                  Purses
                </Link>
                <Link
                  href={routes.jewellery}
                  className="text-[#1B1918] hover:text-[#0f4a45]"
                >
                  Jewellery
                </Link>
                {/* <Link className="text-[#1B1918] hover:text-[#0f4a45]">
                  Featured Collections
                </Link>
                <Link className="text-[#1B1918] hover:text-[#0f4a45]">Sale</Link> */}
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
