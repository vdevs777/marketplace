import { FC } from "react";
import { useAppPriceTextViewModel } from "./useAppPriceText.viewModel";
import { Text, View } from "react-native";

export const AppPriceTextView: FC<
  ReturnType<typeof useAppPriceTextViewModel> & {
    currencyClassName?: string;
    valueClassName?: string;
  }
> = ({
  currencyClassName,
  valueClassName,
  currencySymbol,
  formatPrice,
  value,
  valueText,
}) => {
  return (
    <View className="flex-row items-baseline">
      <Text className={currencyClassName ?? "text-sm text-gray-900"}>
        {currencySymbol}
      </Text>
      <Text className={valueClassName ?? "text-2xl font-bold text-gray-900"}>
        {valueText}
      </Text>
    </View>
  );
};
