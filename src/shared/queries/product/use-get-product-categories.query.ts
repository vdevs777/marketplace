import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";

export const useGetProductCategoriesQuery = () => {
  const query = useQuery({
    queryKey: ["products-categories"],
    queryFn: () => productService.getProductCategories(),
    staleTime: 1000 * 60 * 60,
  });
  return query;
};
