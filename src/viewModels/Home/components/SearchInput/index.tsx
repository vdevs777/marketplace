import { Text, TouchableOpacity, View } from "react-native";
import { AppInput } from "../../../../shared/components/AppInput";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";
import { Filter } from "../Filter";
import { FC } from "react";

interface SearchInputParams {
  setSearchText: (text: string) => void;
  searchText?: string;
}

export const SearchInput: FC<SearchInputParams> = ({
  setSearchText,
  searchText,
}) => {
  const { open } = useBottomSheetStore();
  return (
    <View className="mb-3 mt-6">
      <Text className="text-2xl font-bold mt-6">Explore produtos</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput
            placeholder="Pesquisar"
            leftIcon="search"
            returnKeyType="search"
            className="text-lg flex-1"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            open({ content: <Filter />, config: { snapPoints: ["90%"] } })
          }
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
