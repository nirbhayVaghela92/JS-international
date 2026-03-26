"use client";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/commonHelpers";
import { Order } from "@/types";


interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Order Summary
      </h2>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="text-slate-900 dark:text-white font-medium">
            {formatCurrency(order.total_amount)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-400">Tax (GST)</span>
          <span className="text-slate-900 dark:text-white font-medium">
            {order.tax ? formatCurrency(order.tax) : "N/A"}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-400">Shipping</span>
          <span className="text-slate-900 dark:text-white font-medium">
            {order.shippingCost === 0
              ? "Free"
              : order.shippingCost ? formatCurrency(order.shippingCost): "N/A"}
          </span>
        </div>

        {/* Discount */}
        {order.discount > 0 && (
          <div className="flex justify-between items-center text-green-700 dark:text-green-400">
            <span>Discount</span>
            <span className="font-medium">
              -{formatCurrency(order.discount)}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            Total
          </span>
          <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>
    </Card>
  );
}
