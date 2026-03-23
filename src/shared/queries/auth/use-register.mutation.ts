import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { RegisterHttpParams } from "../../interfaces/http/register";
import { useUserStore } from "../../store/user-store";

interface UseRegisterMutationParams {
  onSuccess?: () => void;
}

export const useRegisterMutation = ({
  onSuccess,
}: UseRegisterMutationParams = {}) => {
  const { setSession } = useUserStore();
  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpParams) =>
      authService.register(userData),
    onSuccess: (response) => {
      setSession(response);
      onSuccess?.();
    },
    onError: (error) => console.log("erro no register" + error),
  });

  return mutation;
};
