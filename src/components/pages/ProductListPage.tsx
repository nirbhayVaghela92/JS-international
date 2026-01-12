"use client";

import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FilterOptionKey, ProductListParams, ProductSections } from "@/types";
import {
  getKeysByProductSection,
  getSectionLabel,
} from "@/helpers/categoryHelper";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { useProductList } from "@/hooks/queries/useProduct";
import { Loader } from "@/components/common/Loader";
import { filterOptions } from "@/lib/data";
import { getLabelFromKey } from "@/helpers/commonHelpers";

interface ProductListPageProps {
  category: ProductSections;
}

export const ProductListPage: FC<ProductListPageProps> = ({ category }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [filter, setFilter] = useState<ProductListParams>({
    category: undefined,
    arrival_sort: undefined,
    bestSeller: false,
    price_sort: undefined,
    limit: 12,
    page: 1,
    newArrival: false,
    search: undefined,
    wishList: false,
  });
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const keys = getKeysByProductSection(category);
  const {
    data: productList,
    isLoading,
    pagination,
  } = useProductList({
    ...filter,
    ...keys,
    page: 1,
    limit: 12,
  });

  const categoryLabel = getSectionLabel(category);

  const handleSortChange = (sortOption: string | null) => {
    setSelectedSort(sortOption);
    // Implement sorting logic here based on sortOption
  };

  const handleFilterChange = (filterOptionKey: FilterOptionKey) => {
    setSelectedFilter(filterOptionKey);
    if (filterOptionKey === "price_high_to_low") {
      setFilter((prev) => ({
        ...prev,
        price_sort: "DESC",
      }));
    } else if (filterOptionKey === "price_low_to_high") {
      setFilter((prev) => ({
        ...prev,
        price_sort: "ASC",
      }));
    } else if (filterOptionKey === "new_arrivals") {
      setFilter((prev) => ({
        ...prev,
        newArrival: true,
      }));
    }
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedFilter(null);
    setFilterOpen(false);
    setFilter((prev) => ({
      ...prev,
      price_sort: undefined,
      newArrival: false,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }

      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <Link
              href={routes.home}
              className="hover:text-[#094745] transition"
            >
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
            <div className="relative" ref={filterRef}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setFilterOpen(!filterOpen);
                    setSortOpen(false);
                  }}
                  className="border border-[#E7B250] px-3 py-2 cursor-pointer!"
                >
                  <Image
                    width={20}
                    height={20}
                    src="/images/icons/filter.png"
                    alt="Filter"
                    className="h-5 w-5 cursor-pointer!"
                  />
                </button>

                <span className="text-black">
                  {getLabelFromKey(selectedFilter, filterOptions.slice()) ||
                    "Filters"}
                </span>
              </div>

              {filterOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-48 bg-black p-4 text-sm text-white">
                  {/* Clear Filter */}
                  {selectedFilter && (
                    <>
                      <p
                        onClick={() => handleClearFilters()}
                        className="
                          mb-2 cursor-pointer!
                          text-xs text-[#9B9B9B]
                          hover:text-[#E7B250]
                        "
                      >
                        Clear Filter
                      </p>

                      <div className="mb-2 h-px bg-white/10" />
                    </>
                  )}

                  {filterOptions.map((item) => (
                    <p
                      key={item.key}
                      onClick={() => {
                        handleFilterChange(item.key);
                      }}
                      className={`
                        py-1 cursor-pointer!
                        hover:text-[#E7B250]
                        ${
                          selectedFilter === item.key
                            ? "text-[#E7B250] font-medium"
                            : ""
                        }
                      `}
                    >
                      {item.label}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sort + Count */}
            <p className="hidden sm:block text-sm text-black">
              {categoryLabel} <span>({pagination?.total ?? 0})</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="cus-container">
          {/* GRID */}
          {isLoading ? (
            <Loader loadingText="Loading products..." />
          ) : (
            <div
              className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
            >
              {!isLoading && productList?.length > 0 ? (
                productList?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center text-black col-span-full">
                  No products found.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductListPage;
