import { ActivityIndicator, View } from "react-native";
import { colors } from "../../../../styles/colors";

interface ListFooterParams {
  isLoadingMore: boolean;
}

export const ListFooter = ({ isLoadingMore }: ListFooterParams) => {
  if (!isLoadingMore) return null;

  return (
    <View className="py-4">
      <ActivityIndicator color={colors["purple-base"]} size="small" />
    </View>
  );
};
