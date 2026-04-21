import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";

export const useGetProductDetailsQuery = (productId: number) => {
  const query = useQuery({
    queryFn: () => productService.getProductDetails(productId),
    queryKey: ["product-details", productId],
  });

  return query;
};
