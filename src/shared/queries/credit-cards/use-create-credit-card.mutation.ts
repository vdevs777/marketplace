import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditCardService } from "../../services/credit-card.service";
import { CreateCreditCardRequest } from "../../interfaces/http/create-credit-card";
import { Toast } from "toastify-react-native";

export const useCreateCreditCardMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (creditCardData: CreateCreditCardRequest) =>
      creditCardService.createCreditCard(creditCardData),
    onSuccess: (response) => {
      Toast.success(response.message ?? "Cartão criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
  });

  return mutation;
};
