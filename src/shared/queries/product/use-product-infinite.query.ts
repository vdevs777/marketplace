import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { buildImageUrl } from "../../helpers/buildImageUrl";

export const useProductInfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await productService.getProducts({
          pagination: { page: pageParam, perPage: 10 },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    queryKey: ["products"],
    staleTime: 1000 * 60 * 1,
  });

  const products = data?.pages
    .flatMap((page) => page.data)
    .map((product) => ({ ...product, photo: buildImageUrl(product.photo) }));

  return {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  };
};
