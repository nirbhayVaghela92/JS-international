"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { Order } from "@/types";
import { getStatusColor, getStatusLabel } from "@/helpers/order-utils";
import { formatCurrency, formatDate } from "@/helpers/commonHelpers";


interface OrderHeaderProps {
  order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const statusColor = getStatusColor(order.order_status);

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <Link href="/orders">
        <Button
          variant="ghost"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Button>
      </Link>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Order ID */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Order Number
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {order.orderId}
            </p>
          </div>

          {/* Order Date */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Order Date
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {formatDate(order.orderDate)}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Status
            </p>
            <Badge className={`${statusColor.badge} text-xs`}>
              {getStatusLabel(order.order_status)}
            </Badge>
          </div>

          {/* Total Amount */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">
              Total Amount
            </p>
            <p className="text-xl font-bold text-amber-700 dark:text-amber-400">
              {formatCurrency(order.total_amount)}
            </p>
          </div>
        </div>

        {/* Print Button */}
        <Button
          variant="outline"
          size="sm"
          className="border-slate-300 dark:border-slate-600"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Invoice
        </Button>
      </div>
    </div>
  );
}
