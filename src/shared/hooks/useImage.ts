import { ImagePickerOptions } from "expo-image-picker";
import { useAppModal } from "./useAppModal";
import { useCamera } from "./useCamera";
import { useGallery } from "./useGallery";
import { useModalStore } from "../store/modal-store";

interface UseImageParams extends ImagePickerOptions {
  callback: (uri: string | null) => void;
}

export const useImage = ({ callback, ...pickerOptions }: UseImageParams) => {
  const modals = useAppModal();
  const { close } = useModalStore();
  const { openCamera, isLoading: isLoadingCamera } = useCamera(pickerOptions);
  const { openGallery, isLoading: isLoadingGallery } =
    useGallery(pickerOptions);

  const handleCallback = (uri: string | null) => {
    close();
    callback(uri);
  };

  const isLoading = Boolean(isLoadingCamera || isLoadingGallery);

  const handleSelectImage = () => {
    modals.showSelection({
      title: "Selecionar foto",
      message: "Escolha uma opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "primary",
          onPress: async () => {
            const imageUri = await openGallery();
            handleCallback(imageUri);
          },
        },
        {
          text: "Câmera",
          icon: "camera",
          variant: "primary",

          onPress: async () => {
            const imageUri = await openCamera();
            handleCallback(imageUri);
          },
        },
      ],
    });
  };

  return { handleSelectImage, isLoading };
};
