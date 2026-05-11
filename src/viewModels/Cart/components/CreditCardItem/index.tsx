import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { FC } from "react";
import { CreditCardItemView } from "./CreditCardItem.view";
import { useCreditCardItemViewModel } from "./useCreditCardItem.viewModel";

interface CreditCardItemParams {
  creditCard: CreditCard;
  isSelected: boolean;
  setSelectedCreditCard: (prev: CreditCard | null) => void;
}

export const CreditCardItem: FC<CreditCardItemParams> = ({
  creditCard,
  setSelectedCreditCard,
  isSelected,
}) => {
  const viewModel = useCreditCardItemViewModel(creditCard);

  return (
    <CreditCardItemView
      {...viewModel}
      setSelectedCreditCard={setSelectedCreditCard}
      isSelected={isSelected}
    />
  );
};
