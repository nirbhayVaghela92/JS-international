"use client"


import Button from "@/components/common/Button";
import ProductCard from "@/components/common/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"
import { HiOutlineCalendar } from "react-icons/hi";


const products = [
  {
    id: 1,
    image: "/images/watches/p1.png",
    title: "Lillypearlie Women's Miscellaneous Earrings",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
  {
    id: 2,
    image: "/images/watches/p2.png",
    title: "Belisenna Watch Steel, White, Silver Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
  {
    id: 3,
    image: "/images/watches/p3.png",
    title: "Féroce Mini Watch Steel, Apricot Pearl, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "₹2,999",
  },
  {
    id: 4,
    image: "/images/watches/p4.png",
    title: "La Tétragone Watch Steel Dark Cherry, Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
  {
    id: 5,
    image: "/images/watches/p5.png",
    title: "Fluette Watch Leather, Black Lizard, Gold Colour",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
    {
    id: 6,
    image: "/images/watches/p6.png",
    title: "Gracieuse Petite Watch Steel, Dark Cherry, Gold Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
    {
    id: 7,
    image: "/images/watches/p7.png",
    title: "Gracieuse Mini Watch Double Leather, Wine, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
    {
    id: 8,
    image: "/images/watches/p8.png",
    title: "Minuit Watch Mesh, White, Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
    {
    id: 9,
    image: "/images/watches/p9.png",
    title: "Minuit Multifunction Watch Leather, Dark Cherry Lizard, Gold Colour",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
    {
    id: 10,
    image: "/images/watches/p10.png",
    title: "Gracieuse Petite Watch Double Leather, Nutshell, Gold Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
    {
    id: 11,
    image: "/images/watches/p11.png",
    title: "Belisenna Watch Steel, Wine, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
    {
    id: 12,
    image: "/images/watches/p12.png",
    title: "Gracieuse Mini Watch Steel, Full Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
    {
    id: 13,
    image: "/images/watches/p13.png",
    title: "Fluette Watch Leather Nutshell, Sand Texture White, Gold Colour",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
    {
    id: 14,
    image: "/images/watches/p14.png",
    title: "Gracieuse Petite Watch Steel, White, Gold Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
    {
    id: 15,
    image: "/images/watches/p15.png",
    title: "Fluette Watch Steel, Sand Texture Full Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
    {
    id: 16,
    image: "/images/watches/p16.png",
    title: "Minuit Watch Mesh Crystals, Full Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
    {
    id: 17,
    image: "/images/watches/p17.png",
    title: "Retro 70's Watch Steel, Sage Green, Silver Colour",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
    {
    id: 18,
    image: "/images/watches/p18.png",
    title: "La Tétragone Watch Mesh, Black, Gold Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
    {
    id: 19,
    image: "/images/watches/p19.png",
    title: "Gracieuse Petite Watch Steel, Two-Tone",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
    {
    id: 20,
    image: "/images/watches/p20.png",
    title: "Triomphe Watch Mesh, Black, Gold colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
    {
    id: 21,
    image: "/images/watches/p21.png",
    title: "Gracieuse Petite Watch Steel, Mauve Pink, Gold Colour",
    code: "CW15006",
    price: "800",
    oldPrice: "1,999",
  },
    {
    id: 22,
    image: "/images/watches/p22.png",
    title: "La Tétragone Watch Mesh, White, Gold Colour",
    code: "CB13309",
    price: "14,199",
    oldPrice: "15,399",
  },
    {
    id: 23,
    image: "/images/watches/p23.png",
    title: "Gracieuse Petite Watch Steel, Full Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
    {
    id: 24,
    image: "/images/watches/p24.png",
    title: "Gracieuse Watch Steel, Full Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  }
]

const blogs = [
  {
    id: 1,
    image: "/images/blogs/blog-1.png",
    date: "November 6, 2025",
    title:
      "Styling Tips: How to Wear Designer Jewellery for Every Occasion",
    link: "/blogs/styling-tips",
  },
  {
    id: 2,
    image: "/images/blogs/blog-2.png",
    date: "November 6, 2025",
    title:
      "Luxury on a Budget: Best Affordable Designer Handbags",
    link: "/blogs/luxury-on-budget",
  },
  {
    id: 3,
    image: "/images/blogs/blog-3.png",
    date: "November 6, 2025",
    title:
      "How Luxury Jewellery Brands Are Embracing Sustainability",
    link: "/blogs/sustainability",
  },
]

export default function ProductPage() {
  
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <main className="pt-[46px]">
      <section className="relative">
        <Image
            src="/images/breadcrumb-img-1.png"
            alt="quote-icon"
            width={1920}
            height={400}
            className=" h-[400px] w-full"
          />
          <div className="text-center absolute top-1/2 left-1/2 bottom-[80px] -translate-x-1/2">
            <h2 className="text-[40px] text-[#E7B250] font-bold">WOMEN'S WATCHES</h2>
            <nav className="text-sm text-[#9B9B9B]">
              <Link
                href="/"
                className="hover:text-[#094745] transition"
              >
                Home
              </Link>

              <span className="mx-2">/</span>

              <span className="text-[#E7B250] font-medium">
                Women's Watches
              </span>
            </nav>
          </div>
      </section>

      <section className="w-full px-4 py-6">
        <div className="cus-container">
          <div className="flex flex-wrap items-center justify-between gap-4">

            {/* LEFT: Filter */}
            <div className="relative">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="
                    border border-[#E7B250]
                    px-4 py-3
                    text-sm text-white
                  "
                >
                  {/* Filter Icon Image */}
                  <img
                    src="/images/icons/filter.png" // you will replace
                    alt="Filter"
                    className="h-5 w-5"
                  />
                </button>
                <span className="text-black">Filter</span>
              </div>

              {/* Filter Dropdown */}
              {filterOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-48 border border-[#E7B250] bg-black p-4 text-sm text-white">
                  <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                    Price: Low to High
                  </p>
                  <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                    Price: High to Low
                  </p>
                  <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                    New Arrivals
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: Sort + Count */}
            <div className="flex items-center gap-6">

              {/* Sort By */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="
                    flex items-center justify-between gap-4
                    border border-[#E7B250]
                    px-5 py-3
                    text-sm text-white
                    min-w-[180px]
                  "
                >
                  <span className="text-black">Sort By</span>
                  <FiChevronDown className="text-[#E7B250]" />
                </button>

                {/* Sort Dropdown */}
                {sortOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-full border border-[#E7B250] bg-black p-4 text-sm text-white">
                    <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                      Featured
                    </p>
                    <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                      Price: Low to High
                    </p>
                    <p className="py-1 hover:text-[#E7B250] cursor-pointer">
                      Price: High to Low
                    </p>
                  </div>
                )}
              </div>

              {/* Product Count */}
              <p className="hidden sm:block text-sm text-black">
                Women&apos;s Watches <span>(90)</span>
              </p>

            </div>
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className="cus-container">

          {/* GRID */}
          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Latest Blog Start Here */}
            
      <section className="bg-white py-28">
        <div className="cus-container">
                    
          {/* Heading */}
          <SectionHeading
            title="Latest Blogs"
            subtitle="Read helpful tips, trends, and parenting guides from our experts."
          />

          {/* Blog Grid */}
          <div className="mt-16 grid gap-10 px-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col">
                
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-[440px] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <HiOutlineCalendar className="text-base" />
                  <span>{blog.date}</span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-semibold leading-snug text-[#1B1918]">
                  {blog.title}
                </h3>

                {/* Button */}
                <div className="mt-6">
                  <Button
                    href={blog.link}
                    bgColor="bg-[#094745]"
                    textColor="text-white"
                    px="px-8"
                    py="py-4"
                    fontSize="text-sm"
                    className="w-full rounded-none"
                  >
                    EXPLORE MORE
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
