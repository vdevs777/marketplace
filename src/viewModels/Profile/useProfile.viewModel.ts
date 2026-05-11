import { useForm } from "react-hook-form";
import { ProfileFormData, profileScheme } from "./profile.scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useUserStore } from "../../shared/store/user-store";
import { useUpdateProfileMutation } from "../../shared/queries/profile/use-update-profile.mutation";
import { useAppModal } from "../../shared/hooks/useAppModal";
import { useModalStore } from "../../shared/store/modal-store";
import { useCartStore } from "../../shared/store/cart-store";
import { useImage } from "../../shared/hooks/useImage";
import { CameraType } from "expo-image-picker";
import { useUploadAvatarMutation } from "../../shared/queries/auth/use-upload-avatar.mutation";

export const useProfileViewModel = () => {
  const { user, logout } = useUserStore();
  const { close } = useModalStore();
  const { clearCart } = useCartStore();

  const uploadAvatarMutation = useUploadAvatarMutation();

  const { handleSelectImage } = useImage({
    callback: async (uri) => {
      if (uri) {
        const { url: responseUrl } =
          await uploadAvatarMutation.mutateAsync(uri);
      }
    },
    cameraType: CameraType.front,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileScheme),
    defaultValues: {
      email: user?.email ?? "",
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      newPassword: undefined,
      password: undefined,
    },
  });

  const updateProfileMutation = useUpdateProfileMutation();
  const { showSelection } = useAppModal();

  const validatePasswords = (userData: ProfileFormData) => {
    if (!userData.password) return true;

    if (
      userData.password === userData.newPassword &&
      userData.password.length > 0
    ) {
      return false;
    }

    return true;
  };

  const onSubmit = handleSubmit(async (userData) => {
    if (!validatePasswords(userData)) return;

    await updateProfileMutation.mutateAsync(userData);
  });

  const handleLogout = () =>
    showSelection({
      title: "Sair",
      message: "Você tem certeza que deseja sair da sua conta?",
      options: [
        {
          variant: "danger",
          onPress: () => {
            clearCart();
            logout();
            close();
          },
          text: "Sair",
        },
        { variant: "primary", onPress: close, text: "Permanecer logado" },
      ],
    });

  return {
    onSubmit,
    control,
    avatarUri: user?.avatarUrl,
    isSubmitting,
    handleLogout,
    handleSelectImage,
  };
};
