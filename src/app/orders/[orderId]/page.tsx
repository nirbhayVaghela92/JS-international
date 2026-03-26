"use client";

import { OrderHeader } from "@/components/orders/OrderHeader";
import { OrderItems } from "@/components/orders/OrderItems";
import { OrderSummary } from "@/components/orders/OrderSummary";
import { ShippingInfo } from "@/components/orders/ShippingInfo";
import { PaymentInfo } from "@/components/orders/PaymentInfo";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { OrderActions } from "@/components/orders/OrderActions";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrderDetails } from "@/hooks/queries/useOrder";
import { Loader } from "@/components/common/Loader";

export default function OrderDetailPage() {
  const params = useParams();
  
  const { data: orderData, isLoading } = useOrderDetails(
    String(params.orderId),
  );

  const order = orderData?.order;

  console.log(order, "orderData");

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <AlertCircle className="w-6 h-6 text-amber-700 dark:text-amber-400 flex-shrink-0" />
          <div className="flex-grow">
            <h2 className="font-semibold text-amber-900 dark:text-amber-100">
              Order Not Found
            </h2>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              The order you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
          </div>
        </div>
        <Link href="/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="pt-7">
      <section className=" pb-10 px-10 cus-container">
        <div className="space-y-6 pt-43">
          {/* Header */}
          <OrderHeader order={order} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Items and Summary */}
            <div className="lg:col-span-2 space-y-6">
              <OrderItems items={order.items} />
              <OrderSummary order={order} />
              <OrderTimeline order={order} />
            </div>

            {/* Right Column - Shipping, Payment, Actions */}
            <div className="space-y-6">
              <ShippingInfo order={order} />
              {/* <PaymentInfo order={order} /> */}
              <OrderActions order={order} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
