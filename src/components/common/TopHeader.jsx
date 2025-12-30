"use client";

// import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { FaInstagram } from "react-icons/fa6";
import { TbBrandFacebook } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { PiYoutubeLogo } from "react-icons/pi";
import { TbBrandLinkedin } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

import { LiaShoppingCartSolid } from "react-icons/lia";
import { PiHeart } from "react-icons/pi";

import "./header.css";
import CartSidebar from "../cart/CartSidebar";

export default function TopHeader() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full text-white fixed top-0 z-10">
      <div className="bg-[#0f4a45] py-[11px]">
        <div className="cus-container">
          <div className="flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between text-sm">
            <p className="text-center font-normal text-[14px] md:text-[16px]">
              Get 5% Extra Discount On Prepaid Orders for orders above Rs. 1000
            </p>

            <div className="items-center gap-4 flex social-icons">
              <a>
                <FaInstagram className="text-xl md:text-2xl" />
              </a>
              <a>
                <TbBrandFacebook className="text-xl md:text-2xl" />
              </a>
              <a>
                <FaXTwitter className="text-xl md:text-2xl" />
              </a>
              <a>
                <PiYoutubeLogo className="text-xl md:text-2xl" />
              </a>
              <a>
                <TbBrandLinkedin className="text-xl md:text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="cus-container bg-white">
            <div className="flex">
                <div className="">
                    <Image
                        src="/images/common/logo.png"
                        alt="Logo"
                        width={340}
                        height={69}
                    />
                </div>
            </div>
        </div> */}
      <header className="mt-[28px]">
        <div className="cus-container">
          <div className="flex items-center justify-between bg-[#fff]">
            {/* 🔹 Logo */}
            <div className="flex items-center gap-3 p-[20px] pr-0">
              <a onClick={() => router.push("/")} className="cursor-pointer">
                <Image
                  src="/images/common/logo.png" // you will add image
                  alt="JS International"
                  width={340}
                  height={69}
                  className="h-auto w-[140px] md:w-[180px] xl:w-[340px]"
                />
              </a>
            </div>

            <div className="flex lg:gap-[30px] xl:gap-[82px]">
              {/* 🔹 Desktop Menu */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium">
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  New Arrivals
                </a>

                {/* Dropdown */}
                <div className="group relative cursor-pointer">
                  <div className="flex items-center gap-1 text-[#1B1918] hover:text-[#0f4a45]">
                    Watches <FiChevronDown className="text-sm" />
                  </div>

                  <div className="absolute left-0 top-full hidden w-48 bg-white shadow-lg group-hover:block">
                    <a
                      className="block px-4 py-3 text-[#1B1918] hover:bg-gray-100"
                    >
                      Men's Watches
                    </a>
                    <a
                      className="block px-4 py-3 text-[#1B1918] hover:bg-gray-100"
                      onClick={() => router.push("/product")}
                    >
                      Women's Watches
                    </a>
                  </div>
                </div>

                <Link href="#" className="text-[#1B1918] hover:text-[#0f4a45]">
                  Purses
                </Link>
                <Link href="#" className="text-[#1B1918] hover:text-[#0f4a45]">
                  Jewellery
                </Link>
                <Link
                  href="#"
                  className="text-[#1B1918] hover:text-[#0f4a45] proved"
                >
                  Featured Collections
                </Link>
                <Link href="#" className="text-[#1B1918] hover:text-[#0f4a45]">
                  Sale
                </Link>
              </nav>

              {/* 🔹 Icons */}
              <div className="flex items-center gap-3 md:gap-5 bg-[#f7ecd6] px-3 md:px-6 py-7 md:py-11">
                <FiSearch className="text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]" />
                <button onClick={() => setCartOpen(true)}>
                  <LiaShoppingCartSolid className="text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]" />
                </button>
                <PiHeart className="text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]" />
                <FiUser
                  className="text-xl cursor-pointer text-[#1B1918] hover:text-[#0f4a45]"
                  onClick={() => router.push("/login")}
                />

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden text-2xl"
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
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  New Arrivals
                </a>
                <a onClick={() => router.push("/product")} className="text-[#1B1918] hover:text-[#0f4a45]">
                  Watches
                </a>
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  Purses
                </a>
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  Jewellery
                </a>
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  Featured Collections
                </a>
                <a className="text-[#1B1918] hover:text-[#0f4a45]">
                  Sale
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
/* Get 5% Extra Discount On Prepaid Orders for orders above Rs. 1000 */
