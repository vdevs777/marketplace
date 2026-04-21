import { create } from "zustand";

export interface FilterState {
  valueMin: number | null;
  valueMax: number | null;
  selectedCategories: number[];
  searchText: string;
}

interface FilterStore {
  appliedFilters: FilterState;
  filters: FilterState;

  updateFilter: (props: {
    key: keyof FilterState;
    value: string | number[] | number;
  }) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const defaultFilterValues = {
  searchText: "",
  selectedCategories: [],
  valueMax: null,
  valueMin: null,
};

export const useFilterStore = create<FilterStore>((set) => ({
  appliedFilters: defaultFilterValues,
  filters: defaultFilterValues,

  updateFilter: ({ key, value }) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () =>
    set({
      appliedFilters: defaultFilterValues,
      filters: defaultFilterValues,
    }),
  applyFilters: () =>
    set((state) => ({
      appliedFilters: state.filters,
    })),
}));
