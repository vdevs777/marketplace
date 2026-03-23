import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { appInputVariants, AppInputVariantsProps } from "./input.variants";
import { FC } from "react";
import { useAppInputViewModel } from "./useAppInputViewModel";
import { colors } from "../../../styles/colors";

export interface AppInputProps extends TextInputProps, AppInputVariantsProps {
  error?: string;
  label?: string;
  containerClassName?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  mask?: (value: string) => void | string;
}

export const AppInput: FC<AppInputProps> = ({
  label,
  containerClassName,
  leftIcon,
  rightIcon,
  mask,
  value,
  isError,
  secureTextEntry = false,
  onBlur,
  onFocus,
  onChangeText,
  isDisabled,
  error,
  ...textInputProps
}) => {
  const {
    getIconColor,
    handleBlur,
    handleFocus,
    handlePressWrapper,
    handleTogglePassword,
    showPassword,
    handleTextChange,
    isFocused,
  } = useAppInputViewModel({
    onBlur,
    onFocus,
    isError: !!error,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value,
  });

  const styles = appInputVariants({ isFocused, isDisabled, isError: !!error });
  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        {leftIcon && (
          <Ionicons
            className="mr-3"
            name={leftIcon}
            size={22}
            color={getIconColor()}
          />
        )}
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input()}
          onChangeText={handleTextChange}
          placeholderTextColor={colors.gray[100]}
          value={value}
          secureTextEntry={showPassword}
          {...textInputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleTogglePassword}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
            />
          </TouchableOpacity>
        )}
      </Pressable>
      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" /> {error}
        </Text>
      )}
    </View>
  );
};
