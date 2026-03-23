import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { Toast } from "toastify-react-native";

export const useUploadAvatarMutation = () => {
  const mutation = useMutation({
    mutationFn: (imageUri: string) => authService.uploadAvatar(imageUri),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.error("erro na mutation de avatar" + error.name);
      Toast.error("Erro ao fazer upload da foto de perfil");
    },
  });
  return mutation;
};
