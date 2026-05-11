import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { Toast } from "toastify-react-native";
import { useUserStore } from "../../store/user-store";

export const useUploadAvatarMutation = () => {
  const { updateUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: (imageUri: string) => authService.uploadAvatar(imageUri),
    onSuccess: (response) => {
      console.log(response);
      updateUser({ avatarUrl: response.url });
    },
    onError: (error) => {
      console.error("erro na mutation de avatar" + error.name);
      Toast.error("Erro ao fazer upload da foto de perfil");
    },
  });
  return mutation;
};
