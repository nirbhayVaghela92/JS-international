import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";
import { CheckoutRequestType, OrderListParams } from "@/types";

export const createOrder = (body: CheckoutRequestType) => {
  return apiRequest({
    method: "post",
    url: API.createOrder,
    data: body,
    // successMessage: "Order created successfully.",
    showSuccessToast: false,
  });
};

export const getOrders = (params: OrderListParams) => {
  return apiRequest({
    method: "get",
    url: API.listOrders,
    data: params,
  });
};
