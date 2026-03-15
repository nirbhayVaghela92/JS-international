"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateOrder } from "@/hooks/queries/useOrder";
import Image from "next/image";
import { useCartStore } from "@/hooks/store/useCartStore";
import { formatPrice } from "@/helpers/commonHelpers";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutPageProps {
  cartItems?: CartItem[];
  getTotalCartAmount?: () => number;
  formatPrice?: (price: number) => string;
}

const loadRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage({}: CheckoutPageProps) {
  const { cartItems, getTotalCartAmount } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrder();

  const requiredFields = ["fullName", "phone", "address", "city", "pincode"];
  const isFormValid = requiredFields.every((field) =>
    formData[field as keyof typeof formData]?.trim(),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handlePlaceOrder = async () => {
  //   if (isFormValid) {
  //     const orderData = cartItems.map((item) => ({
  //       product_id: item.productId,
  //       variant_id: item.variantId, // Assuming no variants for simplicity
  //       quantity: item.quantity,
  //     }));

  //     // Handle order placement
  //     await createOrder({
  //       items: orderData,
  //       payment_method: "razorpay",
  //     });
  //     console.log("Order placed:", formData);
  //   }
  // };

  const handlePlaceOrder = async () => {
    if (!isFormValid) return;

    const orderData = cartItems.map((item) => ({
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
    }));

    const res = await createOrder({
      items: orderData,
      payment_method: "razorpay",
    });

    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: res.data.amount,
      currency: res.data.currency,
      name: "Your Store Name",
      description: "Order Payment",
      order_id: res.data.razorpay_order_id,

      handler: function (response: any) {
        console.log("Payment Success", response);

        /*
      response contains:
      response.razorpay_payment_id
      response.razorpay_order_id
      response.razorpay_signature
      */

        // call backend verify API here
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      notes: {
        address: formData.address,
      },

      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);

    paymentObject.on("payment.failed", function (response: any) {
      console.error("Payment Failed", response);
    });

    paymentObject.open();
  };

  return (
    <main className="pt-5">
      <section className="bg-[#FBF8F0] pt-48 pb-10">
        <div className="mx-auto w-full max-w-[80%] bg-white cus-container">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="font-serif text-4xl font-bold ">Checkout</h1>
              <p className="mt-2 text-muted-foreground">
                Complete your order by filling in your shipping details
              </p>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Section - Address Form */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Shipping Address
                  </h2>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName" className="text-foreground">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    {/* Address Line */}
                    <div>
                      <Label htmlFor="address" className="text-foreground">
                        Address Line <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="123 Main Street, Apartment 4B"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-2 resize-none"
                        rows={3}
                      />
                    </div>

                    {/* City and State Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-foreground">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-foreground">
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="NY"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div>
                      <Label htmlFor="pincode" className="text-foreground">
                        Pincode <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="10001"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Section - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8 p-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No items in your cart
                      </p>
                    ) : (
                      cartItems.map((item: any) => (
                        <div key={item.id} className="flex gap-3">
                          {item.image && (
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-border">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">
                              {item.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Qty: {item.quantity}
                            </p>
                            <p className="font-semibold text-foreground text-sm mt-1">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && <Separator className="mb-6" />}

                  {/* Subtotal */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-foreground font-medium">
                        Subtotal
                      </span>
                      <span className="font-serif text-xl font-bold text-primary">
                        {formatPrice(getTotalCartAmount())}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      MRP (Inclusive of all taxes). Shipping calculated at
                      checkout.
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base"
                  >
                    PLACE ORDER
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
