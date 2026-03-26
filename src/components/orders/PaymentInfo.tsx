"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Clock } from "lucide-react";
import { Order } from "@/types";
import { formatDate } from "@/helpers/commonHelpers";


interface PaymentInfoProps {
  order: Order;
}

export function PaymentInfo({ order }: PaymentInfoProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Payment Information
      </h2>

      <div className="space-y-7">
        {/* Payment Method */}
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Payment Method
            </h3>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p className="text-slate-900 dark:text-white font-medium">
              {order.paymentMethod}
            </p>
            <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              ✓ Payment Confirmed
            </Badge>
          </div>
        </div>

        {/* Payment Date */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Payment Date
            </h3>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p className="text-slate-900 dark:text-white font-medium">
              {formatDate(order.created_at)}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Payment processed and confirmed
            </p>
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
            Billing Address
          </h3>
          N/A
          {/* <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-1 text-slate-700 dark:text-slate-300 text-sm">
            <p className="font-medium text-slate-900 dark:text-white">
              {order.billingAddress.firstName} {order.billingAddress.lastName}
            </p>
            <p>{order.billingAddress.street}</p>
            <p>
              {order.billingAddress.city}, {order.billingAddress.state}{" "}
              {order.billingAddress.postalCode}
            </p>
            <p>{order.billingAddress.country}</p>
          </div> */}
        </div>
      </div>
    </Card>
  );
}
