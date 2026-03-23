import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Toast } from "toastify-react-native";
import { ImagePickerOptions } from "expo-image-picker";

export const useCamera = (pickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      const currentStatus = status === ImagePicker.PermissionStatus.GRANTED;

      if (!currentStatus) {
        Toast.error(
          "A permissão para acessar a sua câmera é necessária",
          "top",
        );
      }

      return currentStatus;
    } catch (error) {
      Toast.error("Erro ao solicitar permissões da câmera", "top");
      return false;
    }
  }, []);

  const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);

    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync(pickerOptions);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success("Foto capturada com sucesso", "top");
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      Toast.error("Erro ao abrir câmera", "top");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { requestCameraPermission, isLoading, openCamera };
};
