import { FC } from "react";
import { AppPriceTextView } from "./AppPriceText.view";
import { useAppPriceTextViewModel } from "./useAppPriceText.viewModel";

interface AppPriceTextProps {
  currencyClassName?: string;
  valueClassName?: string;
  value: number;
}

export const AppPriceText: FC<AppPriceTextProps> = ({
  value,
  currencyClassName,
  valueClassName,
}) => {
  const viewModel = useAppPriceTextViewModel(value);

  return (
    <AppPriceTextView
      {...viewModel}
      currencyClassName={currencyClassName}
      valueClassName={valueClassName}
    />
  );
};
