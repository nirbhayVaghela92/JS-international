"use client";

import ProductDetails from "@/components/products/productDetails";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import FaqSection from "@/components/sections/FaqSection";
import { HiOutlineCalendar } from "react-icons/hi";
import Button from "@/components/common/Button";
import { routes } from "@/lib/routes";

const products2 = [
  {
    id: 1,
    image: "/images/products2/p1.png",
    title: "Belisenna Watch Double Leather, Mocha, Gold Colour",
    code: "CW15006",
    price: "12,499",
    oldPrice: "14,499",
  },
  {
    id: 2,
    image: "/images/products2/p2.png",
    title: "Essentielle Snake Bracelet Gold Colour",
    code: "CB13309",
    price: "8,599",
    oldPrice: "9,199",
  },
  {
    id: 3,
    image: "/images/products2/p3.png",
    title: "Sacrosié Crossbody Bag, Black, Gold Colour",
    code: "CB13309",
    price: "2,499",
    oldPrice: "2,999",
  },
  {
    id: 4,
    image: "/images/products2/p4.png",
    title: "Gracieuse Petite Watch Steel, White, Gold Colour",
    code: "CB13309",
    price: "9,899",
    oldPrice: "10,399",
  },
  {
    id: 5,
    image: "/images/products2/p5.png",
    title: "Essentielle Round Hoop Earring Gold Colour",
    code: "CB13309",
    price: "15,899",
    oldPrice: "16,499",
  },
  {
    id: 6,
    image: "/images/products2/p1.png",
    title: "Belisenna Watch Double Leather, Mocha, Gold Colour",
    code: "CW15006",
    price: "12,499",
    oldPrice: "14,499",
  },
];

const blogs = [
  {
    id: 1,
    image: "/images/blogs/blog-1.png",
    date: "November 6, 2025",
    title: "Styling Tips: How to Wear Designer Jewellery for Every Occasion",
    link: "/blogs/styling-tips",
  },
  {
    id: 2,
    image: "/images/blogs/blog-2.png",
    date: "November 6, 2025",
    title: "Luxury on a Budget: Best Affordable Designer Handbags",
    link: "/blogs/luxury-on-budget",
  },
  {
    id: 3,
    image: "/images/blogs/blog-3.png",
    date: "November 6, 2025",
    title: "How Luxury Jewellery Brands Are Embracing Sustainability",
    link: "/blogs/sustainability",
  },
];



export default function ProductDetail() {
  const router = useRouter();
  const [api, setApi] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // const categoryLabel = getSectionLabel(category);

  const onInit = (embla) => {
    setApi(embla);
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());

    embla.on("select", () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    });
  };
  
  return (
    <main className="pt-11.5">
      <section className="relative">
        <Image
          src="/images/breadcrumb-img-1.png"
          alt="quote-icon"
          width={1920}
          height={400}
          className=" h-100 w-full"
        />
        <div className="text-center absolute top-1/2 left-1/2 bottom-20 -translate-x-1/2">
          <h2 className="text-[40px] text-[#E7B250] font-bold">
            PRODUCT DETAILS
          </h2>
          <nav className="text-sm text-[#9B9B9B]">
            {/* <Link href="/" className="hover:text-[#094745] ">
                Home
              </Link> */}
            <a
              className="font-medium text-white cursor-pointer"
              onClick={() => router.push(routes.home)}
            >
              Home / Product Details
            </a>
            <span className="mx-2">/</span>

            <span className="text-[#E7B250] font-medium">
              Minuit Watch Mesh, White, Silver Colour
            </span>
          </nav>
        </div>
      </section>
      <div className="bg:[#FBF8F0]">
        <ProductDetails />
      </div>

      <section className="bg-white py-28 relative">
        {/* Heading */}
        <SectionHeading
          title="Your Next Favorite is Here"
          subtitle="Explore new arrivals crafted for your everyday look."
        />

        {/* Carousel */}
        <div className="relative mt-16">
          <Carousel opts={{ align: "start", loop: false }} setApi={onInit}>
            <CarouselContent className="-ml-6">
              {products2.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-[20%]"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Left Arrow */}
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            className={`
              absolute top-[35%] left-5 z-10
              flex h-14 w-14 items-center justify-center
              transition
              ${canPrev ? "bg-[#E7B250]" : "bg-[#1B1918] cursor-not-allowed"}
            `}
          >
            <FiArrowLeft className="text-2xl text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            className={`
              absolute top-[35%] right-5 z-10
              flex h-14 w-14 items-center justify-center
              transition
              ${canNext ? "bg-[#E7B250]" : "bg-[#1B1918] cursor-not-allowed"}
            `}
          >
            <FiArrowRight className="text-2xl text-white" />
          </button>
        </div>
      </section>

      <FaqSection />

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
                  <Image
                    width={440}
                    height={440}
                    src={blog.image}
                    alt={blog.title}
                    className="h-110 w-full object-cover transition-transform duration-500 hover:scale-105"
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
                    // href={blog.link}
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
  );
}
