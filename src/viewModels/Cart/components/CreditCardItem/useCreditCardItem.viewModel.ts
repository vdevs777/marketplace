import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { format } from "date-fns";

export const useCreditCardItemViewModel = (creditCard: CreditCard) => {
  const formattedExpirationDate = format(creditCard.expirationDate, "dd/yyyy");

  const formattedCardNumber = creditCard.number.slice(-4);

  return { creditCard, formattedExpirationDate, formattedCardNumber };
};
