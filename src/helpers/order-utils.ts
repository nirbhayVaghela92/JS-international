import { Order } from "@/types";

export const formatDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export const getStatusColor = (
  status: Order["order_status"],
): {
  bg: string;
  text: string;
  badge: string;
} => {
  const colors: Record<
    Order["order_status"],
    { bg: string; text: string; badge: string }
  > = {
    placed: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
    },
    processing: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-800",
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

export const getStatusLabel = (status: Order["order_status"]): string => {
  const labels: Record<Order["order_status"], string> = {
    placed: "Placed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status];
};
export const getStatusSteps = (
  status: Order["order_status"],
): Array<{ label: string; completed: boolean }> => {
  if (status === "cancelled") {
    return [{ label: "Cancelled", completed: true }];
  }

  const steps: Array<{ label: string; completed: boolean }> = [
    {
      label: "Placed",
      completed: true,
    },
    {
      label: "Processing",
      completed: ["processing", "shipped", "delivered"].includes(status),
    },
    {
      label: "Shipped",
      completed: ["shipped", "delivered"].includes(status),
    },
    {
      label: "Delivered",
      completed: status === "delivered",
    },
  ];

  return steps;
};