import type { Order } from "./mock-orders";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const formatDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export const getStatusColor = (
  status: Order["status"]
): {
  bg: string;
  text: string;
  badge: string;
} => {
  const colors: Record<
    Order["status"],
    { bg: string; text: string; badge: string }
  > = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      badge: "bg-amber-100 text-amber-800",
    },
    processing: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
    },
    shipped: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      badge: "bg-indigo-100 text-indigo-800",
    },
    delivered: {
      bg: "bg-green-50",
      text: "text-green-700",
      badge: "bg-green-100 text-green-800",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      badge: "bg-red-100 text-red-800",
    },
  };
  return colors[status];
};

export const getStatusLabel = (status: Order["status"]): string => {
  const labels: Record<Order["status"], string> = {
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status];
};

export const getStatusSteps = (
  status: Order["status"]
): Array<{ label: string; completed: boolean }> => {
  const steps: Array<{ label: string; completed: boolean }> = [
    { label: "Order Placed", completed: true },
    {
      label: "Processing",
      completed: ["processing", "shipped", "delivered"].includes(status),
    },
    {
      label: "Shipped",
      completed: ["shipped", "delivered"].includes(status),
    },
    { label: "Delivered", completed: status === "delivered" },
  ];

  if (status === "cancelled") {
    return [{ label: "Order Cancelled", completed: true }];
  }

  return steps;
};
