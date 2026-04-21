import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export const useDebounce = <T>(value: T, delay: number = 400) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  });

  return debouncedValue;
};
