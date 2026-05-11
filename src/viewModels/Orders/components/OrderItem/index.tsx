import { Image, Text, View } from "react-native";
import { Order } from "../../../../shared/interfaces/order";
import { FC } from "react";
import { buildImageUrl } from "../../../../shared/helpers/buildImageUrl";
import { format } from "date-fns";
import { AppPriceText } from "../../../../shared/components/AppPriceText";

interface OrderItemParams {
  order: Order;
}

export const OrderItem: FC<OrderItemParams> = ({ order }) => {
  return (
    <View className="flex-row items-center bg-white p-3 pl-0 mb-3 rounded-lg h-[89px]">
      <View className="p-1">
        <Image
          source={{ uri: buildImageUrl(order.productPhoto) }}
          className="w-[88px] h-[80px] rounded-lg mr-4"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 justify-between py-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className="text-base font-semibold text-gray-900 flex-1 mr-2"
            numberOfLines={1}
          >
            {order.productName}
          </Text>
          <Text className="text-sm text-gray-600">
            {format(order.createdAt, "dd/MM/yyyy")}
          </Text>
        </View>
        <View className="flex-row mb-2">
          <Text className="text-sm text-gray-600 mb-1">
            {order.quantity} {order.quantity === 1 ? "Unidade" : "Unidades"}{" "}
            •{" "}
          </Text>
          <AppPriceText
            value={order.totalPrice}
            valueClassName="text-sm text-gray-600"
            currencyClassName="text-sm text-gray-600"
          />
        </View>
        <Text className="text-sm text-gray-600">
          Cartão final {order.creditCard.maskedNumber.slice(-4)}
        </Text>
      </View>
    </View>
  );
};
