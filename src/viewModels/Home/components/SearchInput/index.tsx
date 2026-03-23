import { Text, TouchableOpacity, View } from "react-native";
import { AppInput } from "../../../../shared/components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";

export const SearchInput = () => {
  const { open } = useBottomSheetStore();
  return (
    <View className="mb-3 mt-6">
      <Text className="text-2xl font-bold mt-6">Explore produtos</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput
            leftIcon="search"
            returnKeyType="search"
            className="text-lg flex-1"
          />
        </View>
        <TouchableOpacity
          onPress={() => open({ content: <Text>TESTE!!</Text> })}
          className="ml-5 mt-10 items-center justify-center rounded-xl border h-[48px] w-[48px] border-purple-base"
        >
          <Ionicons
            name="filter-outline"
            size={24}
            color={colors["purple-base"]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
