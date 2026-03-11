"use client";

import { useState, useMemo } from "react";
import { getMockOrders } from "@/lib/mock-orders";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrderTable } from "@/components/orders/OrderTable";
// import { Empty } from "@/components/ui/empty";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const allOrders = getMockOrders();
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sortBy: "recent",
  });

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...allOrders];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchLower) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchLower),
          ),
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((order) => order.status === filters.status);
    }

    // Sorting
    if (filters.sortBy === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
      );
    } else if (filters.sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
      );
    } else if (filters.sortBy === "amount-high") {
      result.sort((a, b) => b.totalAmount - a.totalAmount);
    } else if (filters.sortBy === "amount-low") {
      result.sort((a, b) => a.totalAmount - b.totalAmount);
    }

    return result;
  }, [filters]);

  console.log(filteredAndSortedOrders, "filteredAndSortedOrders");

  return (
    <main className="pt-5">
      <section className="bg-[#FBF8F0] pt-48 pb-10">
        <div className="mx-auto w-full max-w-[80%] bg-white cus-container">
          <div className="max-w-[80%] py-5 mx-auto space-y-4">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                My Orders
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Track and manage all your orders in one place
              </p>
            </div>

            {/* Filters */}
            <OrderFilters onFilterChange={setFilters} />

            {/* Results Count */}
            {/* {filteredAndSortedOrders.length > 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredAndSortedOrders.length} order
                {filteredAndSortedOrders.length !== 1 ? "s" : ""}
              </p>
            )} */}

            {/* Orders Display */}
            {filteredAndSortedOrders.length === 0 ? (
              // <Empty
              //   icon={Package}
              //   title="No orders found"
              //   description="Try adjusting your filters or search to find what you're looking for"
              // />
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="h-10 w-10 text-muted-foreground mb-4" />

                <h3 className="text-lg font-semibold">No orders found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search to find what you&apos;re
                  looking for
                </p>
              </div>
            ) : (
              <>
                {/* Mobile/Tablet View - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
                  {filteredAndSortedOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block">
                  <OrderTable orders={filteredAndSortedOrders} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
