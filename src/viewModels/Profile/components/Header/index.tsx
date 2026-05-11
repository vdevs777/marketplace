import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../../../../styles/colors";
import { router } from "expo-router";
import { useUserStore } from "../../../../shared/store/user-store";
import { FC } from "react";

interface HeaderParams {
  handleLogout: () => void;
}

export const Header: FC<HeaderParams> = ({ handleLogout }) => {
  return (
    <View className="flex-row justify-between items-center  py-3 border-shape">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={router.back}
      >
        <Ionicons name="arrow-back" color={colors["purple-base"]} size={24} />
        <Text className="text-purple-base text-base">Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" color={colors.danger} size={20} />
        <Text className="text-danger text-base">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
