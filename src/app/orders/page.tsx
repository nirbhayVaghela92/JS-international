"use client";

import { useState, useEffect } from "react";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrderTable } from "@/components/orders/OrderTable";
import { Package } from "lucide-react";
import { useOrderList } from "@/hooks/queries/useOrder";
import { OrderListParams } from "@/types";
import { Loader } from "@/components/common/Loader";

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderListParams>({
    // category: undefined,
    arrival_sort: undefined,
    bestSeller: false,
    price_sort: undefined,
    limit: 12,
    page: 1,
    newArrival: false,
    search: undefined,
    wishList: false,
  });
  const { data: ordersList, pagination, isLoading } = useOrderList(filter);
  
  useEffect(() => {
  const newValues = {
    total: pagination?.total,
    page: pagination?.page || 1,
    limit: pagination?.limit ? pagination.limit * 12 : 12,
  };

  // setFilter((prev) => {
  //   if (
  //     prev.total === newValues.total &&
  //     prev.page === newValues.page &&
  //     prev.limit === newValues.limit
  //   ) {
  //     return prev; 
  //   }

  //   return {
  //     ...prev,
  //     ...newValues,
  //   };
  // });
}, [isLoading]);

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
            <OrderFilters onFilterChange={setFilter} />

            {/* Results Count */}
            {/* {filteredAndSortedOrders.length > 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredAndSortedOrders.length} order
                {filteredAndSortedOrders.length !== 1 ? "s" : ""}
              </p>
            )} */}

            {/* Orders Display */}
            {isLoading ? (
              <Loader />
            ) : ordersList.length === 0 ? (
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
                  {ordersList.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block">
                  <OrderTable
                    orders={ordersList}
                    pagination={{
                      limit: pagination.total,
                      page: pagination.page,
                      total: pagination.total,
                      totalPages: pagination.total_pages,
                    }}
                    onPageChange={(newPage) =>
                      setFilter((prev) => ({ ...prev, page: newPage }))
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
