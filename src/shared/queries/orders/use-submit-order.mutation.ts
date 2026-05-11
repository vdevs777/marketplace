import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../../services/orders.service";
import { Toast } from "toastify-react-native";

export const useSubmitOrderMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ordersService.submitOrder,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      console.log(response.message);
    },
    onError: (error) => {
      console.log(error);
      Toast.error(error.message ?? "Falha ao realizar pedido");
    },
  });

  return mutation;
};
