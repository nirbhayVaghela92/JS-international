import Link from "next/link"
import Button from "@/components/common/Button"
import {
  FiInstagram,
  FiFacebook,
  FiX,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi"
import { FaInstagram, FaXTwitter } from "react-icons/fa6"
import { TbBrandFacebook, TbBrandLinkedin } from "react-icons/tb"
import { PiYoutubeLogo } from "react-icons/pi"

export default function Footer() {
  return (
    <footer className="bg-[#094745] text-white">

      {/* 🔹 Newsletter */}
      {/* <div className="border-b border-white/20 bg-[#053836]">
        <div className="cus-container flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-4xl font-semibold">
              Sign Up
            </h2>
            <p className="mt-2 max-w-md text-[#cfdad8]">
              For our newsletter and get 10% off on your next purchase!
            </p>
          </div>
          <div className="flex w-full max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-white/60 bg-transparent px-5 py-4 text-white placeholder:text-[#cfdad8] focus:outline-none"
            />

            <Button
              bgColor="bg-[#e9b75c]"
              textColor="text-black"
              px="px-10"
              py="py-4"
              fontSize="text-sm"
              className="uppercase tracking-wide"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div> */}

      {/* 🔹 Footer Links */}
      <div className="cus-container py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <h4 className="mb-6 text-xl font-semibold">Company</h4>
            <ul className="space-y-4 text-[#cfdad8]">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">FAQs</Link></li>
              <li><Link href="#">Blogs</Link></li>
              <li><Link href="#">Our Story</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-xl font-semibold">Support</h4>
            <ul className="space-y-4 text-[#cfdad8]">
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Shipping & Returns</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Category */}
          <div>
            <h4 className="mb-6 text-xl font-semibold">Category</h4>
            <ul className="space-y-4 text-[#cfdad8]">
              <li><Link href="#">Watch For Men</Link></li>
              <li><Link href="#">Watch For Women</Link></li>
              <li><Link href="#">Purses</Link></li>
              <li><Link href="#">Jewellery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-xl font-semibold">Contact Us</h4>

            <div className="space-y-4 text-[#cfdad8]">
              <a href="tel:+19898989898" className="block">
                Phone: +1-989 898 9898
              </a>

              <a
                href="mailto:support@jsinternational.com"
                className="block"
              >
                Email: support@jsinternational.com
              </a>
            </div>

            {/* Social Icons */}
            {/* <div className="mt-6 flex gap-4 text-xl">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="X"><FiX /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            </div> */}

            <div className="mt-6 items-center gap-4 flex social-icons">
              <a>
                <FaInstagram className="text-2xl" />
              </a>
              <a>
                <TbBrandFacebook className="text-2xl" />
              </a>
              <a>
                <FaXTwitter className="text-2xl" />
              </a>
              <a>
                <PiYoutubeLogo className="text-2xl" />
              </a>
              <a>
                <TbBrandLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Bar */}
      <div className="border-t border-white/20 py-6 text-center text-sm text-[#cfdad8]">
        jsinternational.com Copyright © 2025 | All Rights are Reserved.
      </div>
    </footer>
  )
}
