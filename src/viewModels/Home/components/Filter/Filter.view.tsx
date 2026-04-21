import { FC } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useFilterViewModel } from "./useFilter.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppInput } from "../../../../shared/components/AppInput";
import { AppButton } from "../../../../shared/components/AppButton";
import { AppButtonVariantsEnum } from "../../../../shared/components/AppButton/button.variants";
import Checkbox from "expo-checkbox";

export const FilterView: FC<ReturnType<typeof useFilterViewModel>> = ({
  productCategories,
  isLoading,
  handleCategoryToggle,
  handleValueMaxChange,
  handleValueMinChange,
  selectedCategories,
  handleApplyFilters,
  handleResetFilters,
}) => {
  console.log(productCategories);
  return (
    <View>
      <View className="flex-row items-center justify-between p-4 px-6">
        <Text className="text-lg font-bold text-gray-900">
          Filtrar anúncios
        </Text>
        <TouchableOpacity>
          <Ionicons name="close" size={20} color={colors["purple-base"]} />
        </TouchableOpacity>
      </View>
      <View className="p-4 px-6">
        <Text className="font-semibold text-base text-gray-300">VALOR</Text>
        <View className="flex-row mb-4 w-full">
          <View className="flex-1">
            <AppInput
              onChangeText={(value) => handleValueMinChange(Number(value))}
              placeholder="De"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
          <View className="flex-1">
            <AppInput
              onChangeText={(value) => handleValueMaxChange(Number(value))}
              placeholder="Até"
              keyboardType="numeric"
              containerClassName="w-[90%]"
            />
          </View>
        </View>
        <Text className="font-semibold text-base text-gray-300 ">
          CATEGORIA
        </Text>
        {isLoading ? (
          <Text>Carregando categorias...</Text>
        ) : (
          <View className="mb-6 gap-3">
            {productCategories?.map((category) => (
              <TouchableOpacity
                className="flex-row items-center py-2"
                key={`product-category-${category.id}`}
                onPress={() => handleCategoryToggle(category.id)}
              >
                <Checkbox
                  value={selectedCategories.includes(category.id)}
                  onValueChange={() => handleCategoryToggle(category.id)}
                  color={colors["purple-base"]}
                  className="mr-3 rounded-full"
                />
                <Text className="text-base text-gray-400">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View className="flex-row gap-3 mt-4 mb-6">
          <View className="flex-1">
            <AppButton
              variant={AppButtonVariantsEnum.OUTLINED}
              onPress={handleResetFilters}
            >
              Limpar filtro
            </AppButton>
          </View>
          <View className="flex-1">
            <AppButton onPress={handleApplyFilters}>Filtrar</AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};
