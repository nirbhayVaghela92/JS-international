'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'
import type { Order } from '@/lib/mock-orders'
import { formatCurrency } from '@/lib/order-utils'

interface OrderItemsProps {
  items: Order['items']
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Order Items ({items.length})
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
          >
            {/* Product Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">
                    {item.productName}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    SKU: {item.productId}
                  </p>

                  {/* Variants */}
                  {item.variant && (
                    <div className="flex flex-wrap gap-2">
                      {item.variant.size && (
                        <Badge variant="secondary" className="text-xs">
                          Size: {item.variant.size}
                        </Badge>
                      )}
                      {item.variant.color && (
                        <Badge variant="secondary" className="text-xs">
                          {item.variant.color}
                        </Badge>
                      )}
                      {item.variant.material && (
                        <Badge variant="secondary" className="text-xs">
                          {item.variant.material}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Unit Price:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(item.unitPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Quantity:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {item.quantity}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Subtotal:
                    </span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
