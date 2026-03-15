import { createOrder } from "@/services";
import { CheckoutRequestType } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const response = useMutation({
    mutationKey: ["useRegister"],
    mutationFn: async (body: CheckoutRequestType) => {
      const res = await createOrder(body);
      return res;
    },
  });
  return response;
};