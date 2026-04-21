import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useReviewBottomSheetViewModel } from "./useReviewBottomSheet.viewModel";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { AppInput } from "../../../../shared/components/AppInput";
import { AppButton } from "../../../../shared/components/AppButton";
import {
  AppButtonVariantsEnum,
  buttonVariants,
} from "../../../../shared/components/AppButton/button.variants";
import { Stars } from "./components/Stars";

export const ReviewBottomSheetView: FC<
  ReturnType<typeof useReviewBottomSheetViewModel>
> = ({
  handleContentChange,
  handleChangeRating,
  ratingForm,
  handleFormSubmit,
  isLoading,
}) => {
  return (
    <View className="bg-background rounded-t-2xl">
      <View className="flex-row items-center justify-between p-6">
        <Text className="text-lg font-bold text-gray-900">
          {ratingForm.isEditing ? "Editar avaliação" : "Avaliar produto"}
        </Text>
        <TouchableOpacity className="size-8 items-center justify-center rounded-[10px] border border-gray-400">
          <Ionicons name="close" color={colors.gray[400]} size={24} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className="p-6 items-center justify-center min-h-[300px]">
          <ActivityIndicator color={colors["purple-base"]} size="large" />
          <Text className="text-gray-600 mt-4 text-center">
            Verificando avaliação existente...
          </Text>
        </View>
      ) : (
        <View className="p-6">
          <Text className="font-semibold text-base text-gray-300">Nota</Text>
          <View className="flex-row items-center mb-6 gap-2">
            <Stars
              rating={ratingForm.rating}
              handleChangeRating={handleChangeRating}
            />
          </View>

          <AppInput
            onChangeText={handleContentChange}
            label="COMENTÁRIO"
            placeholder={
              ratingForm.isEditing
                ? "Edite sua avaliação"
                : "Descreva sua avaliação"
            }
            containerClassName="mb-8"
            className="h-[150px]"
            textAlignVertical="top"
            value={ratingForm.content}
            multiline
            numberOfLines={8}
          />
          <View className="flex-row gap-3 mb-8">
            <View className="flex-1">
              <AppButton variant={AppButtonVariantsEnum.OUTLINED}>
                Cancelar
              </AppButton>
            </View>
            <View className="flex-1">
              <AppButton onPress={handleFormSubmit}>
                {ratingForm.isEditing ? "Atualizar" : "Enviar"}
              </AppButton>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
