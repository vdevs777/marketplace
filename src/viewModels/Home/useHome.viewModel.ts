import { useState } from "react";

import { useProductInfiniteQuery } from "../../shared/queries/product/use-product-infinite.query";
import { useFilterStore } from "../../shared/store/use-filter-store";
import { useDebounce } from "../../shared/hooks/useDebounce";

export const useHomeViewModel = () => {
  const { appliedFilters } = useFilterStore();

  const [searchText, setSearchText] = useState("");

  const currentSearchText = useDebounce(searchText);

  const {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useProductInfiniteQuery({
    filters: { ...appliedFilters, searchText: currentSearchText },
  });

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleEndReached = () => {
    handleLoadMore();
  };

  return {
    handleLoadMore,
    handleRefresh,
    products,
    handleEndReached,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    setSearchText,
    searchText,
  };
};
