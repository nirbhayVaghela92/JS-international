'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { routes } from '@/lib/routes'
import { Order } from '@/types'
import {
  Truck,
  FileText,
  MessageSquare,
  RotateCcw,

} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface OrderActionsProps {
  order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
  const router = useRouter();
  const canReturn = order.order_status === 'delivered'

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Track Package */}
        {['shipped', 'delivered'].includes(order.order_status) && (
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Truck className="w-4 h-4 mr-2" />
            Track Package
          </Button>
        )}

        {/* Print Invoice */}
        <Button
          variant="outline"
          className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <FileText className="w-4 h-4 mr-2" />
          Print Invoice
        </Button>

        {/* Contact Support */}
        <Button
          variant="outline"
          className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact Support
        </Button>

        {/* Return Item */}
        {canReturn && (
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Return Item
          </Button>
        )}

        {/* Share Order */}
        {/* <Button
          variant="outline"
          className="border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Order
        </Button>

        <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white">
          Reorder Items
        </Button> */}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Need help? {" "}
          {/* Visit our{' '}
          <button className="font-medium text-amber-600 dark:text-amber-400 hover:underline">
            Help Center
          </button>{' '}
          or{' '} */}
          <button 
          onClick={() => router.push(routes.contactSupport)}
          className="font-medium text-amber-600 dark:text-amber-400 hover:underline">
            Contact Us
          </button>
        </p>
      </div>
    </Card>
  )
}
