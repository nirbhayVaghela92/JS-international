import {
  productDetails,
  productList,
  toggleWishList,
} from "@/services/product.service";
import { ProductListParams } from "@/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useProductList = (params: ProductListParams) => {
  const {
    category,
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
      "useProductList",
      category,
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
      const res = await productList({
        ...params,
        ...(price_sort && { price_sort }),
        ...(arrival_sort && { arrival_sort }),
        ...(newArrival && { newArrival }),
        ...(bestSeller && { bestSeller }),
        ...(wishList && { wishList }),
        ...(search != "" && { search }),
      });
      return res;
    },
  });
  return {
    data: response.data?.data?.products,
    isLoading: response.isLoading,
    pagination: response.data?.data?.pagination,
  };
};

export const useInfiniteProductList = (
  params: ProductListParams,
  enabled: boolean = true
) => {
  const {
    category,
    arrival_sort,
    bestSeller,
    price_sort,
    limit,
    page,
    newArrival,
    search,
    wishList,
  } = params;

  const queryResult = useInfiniteQuery({
    queryKey: [
      "useInfiniteProductList",
      category,
      arrival_sort,
      bestSeller,
      price_sort,
      limit,
      newArrival,
      search,
      wishList,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await productList({
        page: pageParam ?? page,
        limit: limit || 10,
        ...(category && { category }),
        ...(price_sort && { price_sort }),
        ...(arrival_sort && { arrival_sort }),
        ...(newArrival && { newArrival }),
        ...(bestSeller && { bestSeller }),
        ...(wishList && { wishList }),
        ...(search && search !== "" && { search }),
      });

      return res;
    },
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.data?.pagination;

      if (pagination?.page < pagination?.total_pages) {
        return pagination.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    enabled,
  });

  return queryResult;
};

export const useProductDetails = (slug: string) => {
  const response = useQuery({
    queryKey: ["useProductDetails", slug],
    queryFn: async () => {
      const res = await productDetails(slug);
      return res;
    },
  });
  return {
    data: response.data?.data,
    isLoading: response.isLoading,
  };
};

export const useToggleWishList = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["useToggleWishList"],
    mutationFn: async (productId: number) => {
      const res = await toggleWishList(productId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useProductList"],
      });
    },
  });
  return response;
};
