"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
]

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredProducts, setFilteredProducts] = React.useState(sampleProducts)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(sampleProducts)
    } else {
      const filtered = sampleProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery])

  const handleExpand = () => {
    setExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleSelectProduct = (product: (typeof sampleProducts)[0]) => {
    console.log("Selected product:", product)
    setOpen(false)
    setSearchQuery("")
    // Navigate to product page or perform action
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setExpanded(false)
    setOpen(false)
  }

  // Close popover when search bar collapses
  React.useEffect(() => {
    if (!expanded) {
      setOpen(false)
    }
  }, [expanded])

  return (
    <Popover open={open && expanded} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div 
          className={`relative flex items-center transition-all duration-300 ease-in-out ${
            expanded ? "w-full max-w-xl" : "w-10"
          }`}
          onClick={!expanded ? handleExpand : undefined}
        >
          <Search className={`absolute h-5 w-5 text-gray-600 transition-all duration-300 ${
            expanded ? "left-3" : "left-2.5"
          } ${expanded ? "" : "cursor-pointer hover:text-gray-900"}`} />
          <Input
            ref={inputRef}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              if (!searchQuery) {
                setTimeout(() => setExpanded(false), 200)
              }
            }}
            className={`transition-all duration-300 ease-in-out border-gray-300 text-[#1B1918] ${
              expanded 
                ? "w-full pl-10 pr-10 opacity-100" 
                : "w-0 pl-0 pr-0 opacity-0 pointer-events-none border-0"
            }`}
          />
          {searchQuery && expanded && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" sideOffset={8}>
        <Command>
          <CommandList className="max-h-[300px]">
            {filteredProducts.length === 0 ? (
              <CommandEmpty>No products found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Products">
                {filteredProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelectProduct(product)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                    </div>
                    <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}