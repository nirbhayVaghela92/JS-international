import dayjs from "dayjs";

export function formatPrice(price) {
  if (typeof price !== "number" || isNaN(price)) return "";

  return price.toLocaleString("en-IN");
}

export const getLabelFromKey = (key:any, list: any[]) => {
  return list.find((item) => item.key === key)?.label ?? "";
}

export const getFullImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagePath}`;
}

export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM, YYYY") === "Invalid Date"
    ? ""
    : dayjs(date).format("DD MMM, YYYY");
};