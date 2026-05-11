import { Image, Text, TouchableOpacity, View } from "react-native";
import { CartProduct } from "../../../../shared/store/cart-store";
import { FC } from "react";
import { buildImageUrl } from "../../../../shared/helpers/buildImageUrl";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { ProductCartCardView } from "./ProductCartCard.view";
import { useProductCartCardViewModel } from "./useProductCartCard.viewModel";

interface ProductCartCardParams {
  product: CartProduct;
}

export const ProductCartCard: FC<ProductCartCardParams> = ({ product }) => {
  const viewModel = useProductCartCardViewModel();

  return <ProductCartCardView product={product} {...viewModel} />;
};
