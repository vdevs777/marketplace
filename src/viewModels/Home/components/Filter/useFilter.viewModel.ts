import { useState } from "react";
import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { useGetProductCategoriesQuery } from "../../../../shared/queries/product/use-get-product-categories.query";
import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";
import { useFilterStore } from "../../../../shared/store/use-filter-store";

export const useFilterViewModel = () => {
  const {
    data: productCategories,
    isLoading,
    // error,
    // refetch,
  } = useGetProductCategoriesQuery();

  const { updateFilter, filters, applyFilters, resetFilters } =
    useFilterStore();
  const { close } = useBottomSheetStore();

  const handleValueMaxChange = (value: number) => {
    updateFilter({ key: "valueMax", value });
  };

  const handleValueMinChange = (value: number) => {
    updateFilter({ key: "valueMin", value });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const categoryAlreadySelected =
      filters.selectedCategories.includes(categoryId);

    if (categoryAlreadySelected) {
      updateFilter({
        key: "selectedCategories",
        value: filters.selectedCategories.filter((id) => id !== categoryId),
      });
    } else {
      updateFilter({
        key: "selectedCategories",
        value: [...filters.selectedCategories, categoryId],
      });
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
    close();
  };

  const handleResetFilters = () => {
    resetFilters();
    close();
  };

  return {
    productCategories,
    isLoading,
    handleValueMaxChange,
    handleValueMinChange,
    handleCategoryToggle,
    selectedCategories: filters.selectedCategories,
    handleApplyFilters,
    handleResetFilters,
  };
};
