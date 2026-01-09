"use client";

import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { FC, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { ProductSections } from "@/types";
import { getSectionLabel } from "@/helpers/categoryHelper";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { products } from "@/lib/data";


interface ProductListPageProps {
  category: ProductSections;
}

export const ProductListPage: FC<ProductListPageProps> = ({ category }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const categoryLabel = getSectionLabel(category);

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
            {categoryLabel?.toUpperCase()}
          </h2>
          <nav className="text-sm text-[#9B9B9B]">
            <Link href={routes.home} className="hover:text-[#094745] transition">
              Home
            </Link>

            <span className="mx-2">/</span>

            <span className="text-[#E7B250] font-medium">{categoryLabel}</span>
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
                  <Image
                    width={5}
                    height={5}
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
                    min-w-45
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
                {categoryLabel} <span>(90)</span>
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductListPage;
