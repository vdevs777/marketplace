import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { UpdateCommentRequest } from "../../interfaces/http/update-comment";
import { productService } from "../../services/product.service";

export const useUpdateCommentMutation = (productId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (comment: UpdateCommentRequest) =>
      productService.updateUserComment(comment),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-comment", productId] });
      queryClient.invalidateQueries({
        queryKey: ["product-comments", productId],
      });

      Toast.success(response.message || "Avaliação atualizada com sucesso!");
    },
    onError: (error) => {
      Toast.error(
        error.message ??
          "Erro ao atualizar avaliação, tente novamente em instantes.",
      );
    },
  });
  return mutation;
};
