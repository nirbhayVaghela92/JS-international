/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { Search, X, ArrowLeft } from "lucide-react";
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

export function SearchBar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data: productList, isLoading } = useProductList({
    search: searchQuery,
    page: 1,
    limit: 500,
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setExpanded(false);
    router.push(routes.productDetails(productSlug));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleClose = () => {
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

  // Mobile full-screen overlay
  if (isMobile && expanded) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* Mobile Search Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-[#f7ecd6] shrink-0">
          <button
            onClick={handleClose}
            className="p-2 -m-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              ref={inputRef}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpen(true);
              }}
              className="w-full h-11 pl-10 pr-10 border-gray-300 text-black"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Results */}
        <div className="flex-1 overflow-y-auto bg-white">
          <Command className="h-full">
            <CommandList className="max-h-none h-full">
              {isLoading && (
                <div className="p-8 text-center text-gray-500">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              )}

              {!isLoading && searchQuery && productList?.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-medium">No products found</p>
                  <p className="text-sm mt-1">Try different keywords</p>
                </div>
              )}

              {!searchQuery && !isLoading && (
                <div className="p-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-medium">Start typing to search</p>
                  <p className="text-sm mt-1">Find your favorite products</p>
                </div>
              )}

              {productList && productList.length > 0 && (
                <CommandGroup heading="Products" className="p-0">
                  {productList.map((product) => (
                    <CommandItem
                      key={product?.id}
                      onSelect={() => handleSelectProduct(product?.slug)}
                      className="flex items-start justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium text-base truncate">
                          {product?.name}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1">
                          {product?.category_name}
                        </span>
                      </div>
                      <span className="text-base font-semibold ml-3 shrink-0">
                        ₹{formatPrice(Number(product?.price))}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      </div>
    );
  }

  // Desktop/Tablet version
  return (
    <Popover open={open && expanded} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative flex items-center transition-all duration-300 ease-in-out",
            expanded ? "w-full max-w-xl" : "w-6 h-6"
          )}
          onClick={!expanded ? handleExpand : undefined}
        >
          <Search
            className={cn(
              "h-6 w-6 text-gray-600 transition-all duration-300",
              expanded
                ? "absolute left-3"
                : "cursor-pointer hover:text-gray-900",
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
                ? "w-full h-10 pl-10 pr-10 opacity-100"
                : "w-0 pl-0 pr-0 opacity-0 pointer-events-none border-0"
            }`}
          />
          {searchQuery && expanded && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
        sideOffset={8}
      >
        <Command className="w-full">
          <CommandList
            className={cn(
              "min-w-62.5 min-h-25 overflow-y-auto",
              isLoading || (!isLoading && productList.length === 0)
                ? "flex items-center justify-center "
                : ""
            )}
          >
            {isLoading && (
              <div className="flex h-full items-center justify-center w-full ">
                <CommandEmpty className="text-center">Loading...</CommandEmpty>
              </div>
            )}

            {!isLoading && productList?.length === 0 && (
              <div className="flex h-full items-center justify-center w-full">
                <CommandEmpty className="text-center">
                  No products found.
                </CommandEmpty>
              </div>
            )}

            {productList && productList.length > 0 && (
              <CommandGroup heading="Products">
                {productList.map((product) => (
                  <CommandItem
                    key={product?.id}
                    onSelect={() => handleSelectProduct(product?.slug)}
                    className="
                      flex items-center justify-between
                      py-3 px-2
                      rounded-md
                      cursor-pointer
                    "
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium truncate">
                        {product?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product?.category_name}
                      </span>
                    </div>

                    <span className="text-sm font-semibold shrink-0">
                      ₹{formatPrice(Number(product?.price))}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
