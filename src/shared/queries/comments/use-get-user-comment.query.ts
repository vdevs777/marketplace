import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";

export const useGetUserCommentQuery = (productId: number) => {
  const query = useQuery({
    queryFn: () => productService.getUserComment(productId),
    queryKey: ["user-comment", productId],
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
