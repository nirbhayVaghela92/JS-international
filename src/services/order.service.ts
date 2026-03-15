import { apiRequest } from "@/helpers/apiRequest";
import { API } from "@/lib/api/apiUrl";
import { CheckoutRequestType } from "@/types";

export const createOrder = (body: CheckoutRequestType) => {
  return apiRequest({
    method: "post",
    url: API.createOrder,
    data: body,
    // successMessage: "Order created successfully.",
    showSuccessToast: false,
  });
};
