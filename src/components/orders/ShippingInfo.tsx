'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Truck, Calendar } from 'lucide-react'
import type { Order } from '@/lib/mock-orders'
import { formatDate, formatDateShort } from '@/lib/order-utils'

interface ShippingInfoProps {
  order: Order
}

export function ShippingInfo({ order }: ShippingInfoProps) {
  const address = order.shippingAddress

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Shipping Information
      </h2>

      <div className="space-y-6">
        {/* Shipping Address */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Delivery Address
            </h3>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-medium text-slate-900 dark:text-white">
              {address.firstName} {address.lastName}
            </p>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
            <p className="pt-2 text-sm">
              <span className="font-medium">Phone:</span> {address.phone}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {address.email}
            </p>
          </div>
        </div>

        {/* Tracking Details */}
        {order.trackingNumber && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Tracking Information
              </h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-2">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Tracking Number
                </p>
                <Badge variant="secondary" className="font-mono">
                  {order.trackingNumber}
                </Badge>
              </div>
              <p className="text-sm">
                <span className="text-slate-600 dark:text-slate-400">Method:</span>{' '}
                <span className="font-medium text-slate-900 dark:text-white">
                  Express Delivery
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Delivery Date */}
        {order.estimatedDeliveryDate && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Estimated Delivery
              </h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
              <p className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                {formatDateShort(order.estimatedDeliveryDate)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Your order should arrive by this date
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
