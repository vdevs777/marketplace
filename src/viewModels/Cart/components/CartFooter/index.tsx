import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppPriceText } from "../../../../shared/components/AppPriceText";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppButton } from "../../../../shared/components/AppButton";
import { useCartStore } from "../../../../shared/store/cart-store";
import { FC } from "react";
import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { CreditCardItem } from "../CreditCardItem";
import { useCartFooterViewModel } from "./useCartFooter.viewModel";
import { CartFooterView } from "./CartFooter.view";

export interface CartFooterParams {
  creditCards: CreditCard[];
  loadingCreditCards: boolean;
  openCardBottomSheet: () => void;
}

export const CartFooter: FC<CartFooterParams> = ({
  creditCards,
  loadingCreditCards,
  openCardBottomSheet,
}) => {
  const viewModel = useCartFooterViewModel();

  return (
    <CartFooterView
      creditCards={creditCards}
      loadingCreditCards={loadingCreditCards}
      openCardBottomSheet={openCardBottomSheet}
      {...viewModel}
    />
  );
};
