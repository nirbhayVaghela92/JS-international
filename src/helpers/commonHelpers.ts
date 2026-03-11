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