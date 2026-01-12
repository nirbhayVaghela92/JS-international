/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useProductList } from "@/hooks/queries/useProduct";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { formatPrice } from "@/helpers/commonHelpers";

// Sample product data - replace with your actual data source
const sampleProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99 },
  { id: 2, name: "Running Shoes", category: "Sports", price: 129.99 },
  { id: 3, name: "Coffee Maker", category: "Kitchen", price: 79.99 },
  { id: 4, name: "Yoga Mat", category: "Sports", price: 29.99 },
  { id: 5, name: "Smart Watch", category: "Electronics", price: 299.99 },
  { id: 6, name: "Backpack", category: "Accessories", price: 49.99 },
  { id: 7, name: "Desk Lamp", category: "Home", price: 39.99 },
  { id: 8, name: "Water Bottle", category: "Sports", price: 19.99 },
];

export function SearchBar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: productList,
    isLoading,
    pagination,
  } = useProductList({
    search: searchQuery,
    page: 1,
    limit: 500,
  });
  console.log(productList, "productList");
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSelectProduct = (productSlug: string) => {
    console.log("Selected product:", productSlug);
    setOpen(false);
    setSearchQuery("");
    router.push(routes.productDetails(productSlug));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setExpanded(false);
    setOpen(false);
  };

  // Close popover when search bar collapses
  useEffect(() => {
    if (!expanded) {
      setOpen(false);
    }
  }, [expanded]);

  return (
    <Popover open={open && expanded} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative flex items-center transition-all duration-300 ease-in-out p-0!",
            expanded ? "w-full max-w-xl" : "w-5 h-5"
          )}
          onClick={!expanded ? handleExpand : undefined}
        >
          <Search
            className={cn(
              "absolute h-5 w-5 text-gray-600 transition-all duration-300",
              expanded ? "left-3" : "",
              expanded ? "" : "cursor-pointer hover:text-gray-900",
              className
            )}
          />
          <Input
            ref={inputRef}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              if (!searchQuery) {
                setTimeout(() => setExpanded(false), 200);
              }
            }}
            className={`transition-all duration-300 ease-in-out border-gray-300 text-[#1B1918] ${
              expanded
                ? "w-full h-8 pl-10 pr-10 opacity-100"
                : "w-0 pl-0 pr-0 opacity-0 pointer-events-none border-0"
            }`}
          />
          {searchQuery && expanded && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
        sideOffset={8}
      >
        <Command>
          <CommandList className="max-h-[300px]">
            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}

            {!isLoading && productList?.length === 0 && (
              <CommandEmpty>No products found.</CommandEmpty>
            )}

            <CommandGroup heading="Products">
              {productList?.map((product) => (
                <CommandItem
                  key={product?.id}
                  onSelect={() => handleSelectProduct(product?.slug)}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{product?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product?.category_name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">
                    ₹{formatPrice(Number(product?.price))}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
