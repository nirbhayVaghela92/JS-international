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
import { routes } from "@/lib/routes";
import { useProductList } from "@/hooks/queries/useProduct";
import { Loader } from "@/components/common/Loader";

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
  const {
    data: productList,
    isLoading,
    pagination,
  } = useProductList({
    wishList: true,
    page: 1,
    limit: 12,
  });

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
              {/* {productList?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-[20%]"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))} */}
              {isLoading ? (
                <Loader loadingText="Loading products..." />
              ) : productList?.length > 0 ? (
                productList?.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-6 basis-full sm:basis-1/2 lg:basis-[20%]"
                  >
                    <ProductCard key={product.id} product={product} />
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-black col-span-full">
                  No products found.
                </p>
              )}
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

      {/* <BlogSection /> */}
    </main>
  );
}
