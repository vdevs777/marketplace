import { marketPlaceApiClient } from "../api/market-place";
import { CreditCard } from "../interfaces/credit-card";
import {
  CreateCreditCardRequest,
  CreateCreditCardResponse,
} from "../interfaces/http/create-credit-card";

const getCreditCards = async () => {
  const { data } =
    await marketPlaceApiClient.get<CreditCard[]>("/credit-cards");
  return data;
};

const createCreditCard = async (creditCardData: CreateCreditCardRequest) => {
  const { data } = await marketPlaceApiClient.post<CreateCreditCardResponse>(
    "/credit-cards",
    creditCardData,
  );
  return data;
};

export const creditCardService = { getCreditCards, createCreditCard };
