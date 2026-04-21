import { ProductInterface } from "../../../../shared/interfaces/product";

interface UseProductCardViewModelParams {
  product: ProductInterface;
}

export const useProductCardViewModel = ({
  product,
}: UseProductCardViewModelParams) => {
  const formatProductName = (name: string) => {
    if (name.length >= 22) {
      return name.slice(0, 22) + "...";
    }
    return name;
  };

  const rating = product.averageRating.toFixed(1).replace(",", ".");

  const displayName = formatProductName(product.name);

  return { product, displayName, rating };
};
