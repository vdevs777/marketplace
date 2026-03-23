import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { AppInput, AppInputProps } from "../AppInput";

interface AppInputControllerProps<T extends FieldValues> extends Omit<
  AppInputProps,
  "value" | "onChangeText" | "error"
> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
}

export function AppInputController<T extends FieldValues>({
  control,
  name,
  errors,
  ...rest
}: AppInputControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
        formState: { isSubmitting },
      }) => {
        return (
          <AppInput
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={error?.message}
            isDisabled={isSubmitting || rest.isDisabled}
            {...rest}
          />
        );
      }}
    />
  );
}
