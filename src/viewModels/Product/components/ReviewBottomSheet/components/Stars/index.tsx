import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { startMapper } from "react-native-reanimated";
import { colors } from "../../../../../../styles/colors";

interface StarsParams {
  rating: number;
  handleChangeRating: (rating: number) => void;
}

export const Stars: FC<StarsParams> = ({ rating, handleChangeRating }) => {
  return Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    const isSelected = starNumber <= rating;

    return (
      <TouchableOpacity
        key={`rating-star-${index}`}
        onPress={() => handleChangeRating(starNumber)}
      >
        <Ionicons
          size={32}
          name={isSelected ? "star" : "star-outline"}
          color={isSelected ? colors["purple-base"] : colors.gray[200]}
        />
      </TouchableOpacity>
    );
  });
};
