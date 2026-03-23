"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Package } from "lucide-react";
import {
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from "@/helpers/order-utils";
import { Order } from "@/types";
import { formatCurrency } from "@/helpers/commonHelpers";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColor = getStatusColor(order.order_status);
  const itemCount = order.items.length;
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="overflow-hidden border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Order ID
            </p>
            <p className="font-semibold text-lg text-slate-900 dark:text-white">
              {order.orderId}
            </p>
          </div>
          <Badge className={`${statusColor.badge} w-fit`}>
            {getStatusLabel(order.order_status)}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Order Date
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              {formatDateShort(order.created_at)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Total Amount
            </p>
            <p className="font-semibold text-amber-700 dark:text-amber-400">
              {formatCurrency(order.total_amount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Items
            </p>
            <p className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
              <Package className="w-4 h-4" />
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              Item Count
            </p>
            <p className="font-medium text-slate-900 dark:text-white">
              {itemCount} product{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/orders/${order.orderId}`} className="flex-1">
            <Button
              variant="default"
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              View Order
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Button variant="outline" className="flex-1">
            Reorder
          </Button>
        </div>
      </div>
    </Card>
  );
}
