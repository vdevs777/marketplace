import { FC } from "react";
import { ProductDetails } from "../../../../shared/interfaces/http/product-details";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { buildImageUrl } from "../../../../shared/helpers/buildImageUrl";
import { router } from "expo-router";
import { AppPriceText } from "../../../../shared/components/AppPriceText";

interface HeaderParams {
  productDetails: ProductDetails;
  handleOpenReview: () => void;
}

export const Header: FC<HeaderParams> = ({
  productDetails,
  handleOpenReview,
}) => {
  return (
    <>
      <View className="pb-5 items-start">
        <TouchableOpacity
          className="w-full justify-start flex-row items-center gap-3"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors["purple-base"]} />
          <Text className="text-base text-purple-base">Voltar</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full rounded-lg shadow-gray-500/30 bg-white">
        <Image
          source={{ uri: buildImageUrl(productDetails.photo) }}
          className="w-full rounded-lg h-[192px]"
        />

        <View className="items-center absolute top-0 right-0 flex-row bg-blue-light px-2 py-1 rounded-bl-lg">
          <Ionicons name="star" size={16} color={colors["blue-base"]} />
          <Text className="text-sm font-semibold ml-1 text-gray-800">
            {productDetails.averageRating.toFixed(1)}
          </Text>
          <Text className="text-[10px] font-semibold ml-1 text-gray-800">
            / 5
          </Text>
        </View>
      </View>
      <View className="bg-background py-8">
        <View className="flex-row justify-between items-baseline mb-4">
          <Text className="text-xl font-bold text-gray-800 max-w-[70%]">
            {productDetails.name}
          </Text>
          <View>
            <AppPriceText
              value={Number(productDetails.value)}
              valueClassName="text-xl font-bold text-gray-800 ml-1"
            />
          </View>
        </View>
        <View className="flex-row items-center bg-blue-light p-3 rounded-lg mb-4">
          <View className="bg-blue-base w-9 h-9 rounded-md items-center justify-center">
            <Ionicons name="trending-up" color={colors.white} size={20} />
          </View>
          <Text className="text-sm text-gray-600 flex-1 ml-5">
            <Text className="font-bold">{productDetails.views} pessoas </Text>
            visualizaram este produto nos últimos 7 dias
          </Text>
        </View>
        <View className="mb-4">
          <Text className="text-base leading-6 text-gray-500">
            {productDetails.description}
          </Text>
        </View>
        {(productDetails.width || productDetails.height) && (
          <View className="mb-4">
            {productDetails.width && (
              <Text className="text-base text-gray-500 mb-1">
                <Text className="text-gray-800">Largura: </Text>
                {productDetails.width}
              </Text>
            )}
            {productDetails.height && (
              <Text className="text-base text-gray-500 mb-1">
                <Text className="text-gray-800">Altura: </Text>
                {productDetails.height}
              </Text>
            )}
          </View>
        )}
        <View className="mb-6">
          <Text className="text-base font-bold text-gray-800">Categoria</Text>
          <Text className="text-base text-gray-600">
            {productDetails.category.name}
          </Text>
        </View>

        <View className="flex-row justify-between items-center pt-4 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800">Avaliações</Text>
          <TouchableOpacity onPress={handleOpenReview}>
            <Text className="text-purple-base text-base font-medium">
              Avaliar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
