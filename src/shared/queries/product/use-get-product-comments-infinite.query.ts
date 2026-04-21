import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";
import { buildImageUrl } from "../../helpers/buildImageUrl";
import { baseURL } from "../../api/market-place";

export const useGetCommentsInfiniteQuery = (productId: number) => {
  const query = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) =>
      productService.getProductComments({
        productId,
        pagination: {
          perPage: 20,
          page: pageParam,
        },
      }),
    queryKey: ["product-comments", productId],
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const comments =
    query.data?.pages
      .flatMap((page) => page.data)
      .map((comment) => ({
        ...comment,
        avatar: {
          url: comment.user.avatar.url
            ? `${baseURL}${comment.user.avatar.url ?? ""}`
            : undefined,
        },
      })) ?? [];

  return { comments, ...query };
};
