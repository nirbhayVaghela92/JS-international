import OrderDetailPage from "@/app/orders/[orderId]/page";
import { createOrder, getOrderDetails, getOrders } from "@/services";
import { CheckoutRequestType, OrderListParams } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useOrderList = (params: OrderListParams) => {
  const {
    // category,
    arrival_sort,
    bestSeller,
    price_sort,
    limit,
    page,
    newArrival,
    search,
    wishList,
  } = params;
  const response = useQuery({
    queryKey: [
      "useOrderList",
      // category,
      arrival_sort,
      bestSeller,
      price_sort,
      limit,
      page,
      newArrival,
      search,
      wishList,
    ],
    queryFn: async () => {
      const res = await getOrders({
        ...params,
        ...(price_sort && { price_sort }),
        ...(arrival_sort && { arrival_sort }),
        ...(newArrival && { newArrival }),
        ...(bestSeller && { bestSeller }),
        ...(wishList && { wishList }),
        ...(search && { search }),
      });
      return res;
    },
  });
  return {
    data: response.data?.data?.orders ?? [], 
    isLoading: response.isLoading,
    pagination: response.data?.data?.pagination,
  };
};

export const useOrderDetails = (orderId: String) => {
  const response = useQuery({
    queryKey: ["useOrderDetails", orderId],
    queryFn: async () => {
      const res = await getOrderDetails(orderId);
      return res;
    },
  });
  return {
    data: response.data?.data,
    isLoading: response.isLoading,
  };
};