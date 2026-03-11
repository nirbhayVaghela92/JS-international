'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronRight } from 'lucide-react'
import type { Order } from '@/lib/mock-orders'
import {
  formatCurrency,
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from '@/lib/order-utils'
import { cn } from '@/lib/utils'
import { routes } from '@/lib/routes'

interface OrderTableProps {
  orders: Order[]
}

export function OrderTable({ orders }: OrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Dummy total pages
  const totalPages = 5

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const statusColor = getStatusColor(order.status)
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )

              return (
                <tr
                  key={order.id}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {order.orderId}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      {formatDateShort(order.orderDate)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold dark:text-amber-400">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <Badge className={cn(statusColor.badge)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Link href={routes.orderView(order.orderId)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>

          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setCurrentPage((p) => (p > 1 ? p - 1 : p))
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((p) =>
                  p < totalPages ? p + 1 : p
                )
              }
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}