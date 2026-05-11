import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { FC } from "react";
import { useCreditCardItemViewModel } from "./useCreditCardItem.viewModel";
import { CreditCard } from "../../../../shared/interfaces/credit-card";

export const CreditCardItemView: FC<
  ReturnType<typeof useCreditCardItemViewModel> & {
    isSelected: boolean;
    setSelectedCreditCard: (prev: CreditCard | null) => void;
  }
> = ({
  creditCard,
  formattedExpirationDate,
  formattedCardNumber,
  isSelected,
  setSelectedCreditCard,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedCreditCard(creditCard)}
      className={`p-4 rounded-lg border bg-purple-50 ${isSelected ? "border-purple-base" : "border-gray-100"}`}
    >
      <View className="flex-row justify-between">
        <View className="mr-4">
          <Ionicons
            name="card-outline"
            size={24}
            color={colors["purple-base"]}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base">Cartão final {formattedCardNumber}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {formattedExpirationDate}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons color={colors["purple-base"]} size={18} name="pencil" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
