import { useQuery } from "@tanstack/react-query";
import { creditCardService } from "../../services/credit-card.service";

export const useGetCreditCardsQuery = () => {
  const query = useQuery({
    queryFn: creditCardService.getCreditCards,
    queryKey: ["credit-cards"],
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
