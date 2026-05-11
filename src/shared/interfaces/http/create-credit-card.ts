import { CreditCard } from "../credit-card";

export interface CreateCreditCardRequest {
  number: string;
  CVV: number;
  expirationDate: string;
}

export interface CreateCreditCardResponse {
  success: boolean;
  message: string;
  data: CreditCard;
}
