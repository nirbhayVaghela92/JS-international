'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, Circle } from 'lucide-react'
import type { Order } from '@/lib/mock-orders'
import { getStatusSteps, formatDate } from '@/lib/order-utils'

interface OrderTimelineProps {
  order: Order
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const steps = getStatusSteps(order.status)

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Order Status Timeline
      </h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline Icon */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {step.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-1 h-12 mt-1 ${
                    step.completed
                      ? 'bg-green-600 dark:bg-green-400'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              )}
            </div>

            {/* Timeline Content */}
            <div className="pt-1 pb-4">
              <p
                className={`font-semibold ${
                  step.completed
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {step.label}
              </p>
              {step.completed && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {index === 0
                    ? `Placed on ${formatDate(order.orderDate)}`
                    : index === steps.length - 1
                      ? `Delivered on ${formatDate(order.updatedAt)}`
                      : `Updated on ${formatDate(order.updatedAt)}`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
