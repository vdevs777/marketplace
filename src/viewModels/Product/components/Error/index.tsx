import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../../../styles/colors";
import { AppButton } from "../../../../shared/components/AppButton";
import { router } from "expo-router";

export const Error = () => {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <Ionicons name="alert-circle" color={colors.danger} size={40} />
      <Text className="text-xl text-center text-danger mt-5">
        Ocorreu um erro a buscar os detalhes do produto!
      </Text>
      <AppButton className="mt-4" onPress={router.back}>
        Voltar
      </AppButton>
    </View>
  );
};
