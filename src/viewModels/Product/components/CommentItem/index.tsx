import { Image, Text, View } from "react-native";
import { ProductComment } from "../../../../shared/interfaces/product-comment";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../styles/colors";
import { useUserStore } from "../../../../shared/store/user-store";

interface CommentItemParams {
  comment: ProductComment;
}

export const CommentItem: FC<CommentItemParams> = ({ comment }) => {
  const { user } = useUserStore();
  const isCurrentUser = user?.id === comment.user.id;

  return (
    <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 rounded-md overflow-hidden bg-gray-200 mr-3">
            {isCurrentUser ? (
              <Image
                className="w-full h-full"
                resizeMode="cover"
                source={{ uri: comment.user.avatar.url }}
              />
            ) : (
              <View className="items-center justify-center w-full h-full">
                <Ionicons name="person" size={20} color={colors.gray[400]} />
              </View>
            )}
          </View>
          <View className="flex-row items-center flex-1 ml-1">
            <Text className="text-base font-medium text-gray-800">
              {comment.user.name}
            </Text>
            {comment.user.id === user?.id && (
              <View className="bg-blue-base px-2 py-1 rounded-full ml-2">
                <Text className="text-white text-xs font-bold">Você</Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex-row items-end">
          <Ionicons name="star" size={16} color={colors["purple-base"]} />
          <Text className="text-sm font-bold text-gray-600">
            {comment.user.rating.value} /{" "}
            <Text className="text-[10px] text-gray-600">5</Text>
          </Text>
        </View>
      </View>
      <Text>{comment.content}</Text>
    </View>
  );
};
