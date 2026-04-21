import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "./components/Header";
import { SearchInput } from "./components/SearchInput";
import { ProductCard } from "./components/ProductCard";
import { FC, memo } from "react";
import { useHomeViewModel } from "./useHome.viewModel";
import { Footer } from "./components/Footer";
import { colors } from "../../styles/colors";
import { RenderHeader } from "./components/RenderHeader";

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleEndReached,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  handleRefresh,
  isRefetching,
  setSearchText,
  searchText,
}) => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={({ id }) => `product-list-item-${id}`}
        numColumns={2}
        ListFooterComponent={
          <Footer
            isLoading={hasNextPage && (isLoading || isFetchingNextPage)}
          />
        }
        onEndReached={handleEndReached}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <RenderHeader searchText={searchText} setSearchText={setSearchText} />
        }
        contentContainerClassName="px-[16px] pb-[120px]"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            colors={[colors["purple-base"]]}
            tintColor={colors["purple-base"]}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};
