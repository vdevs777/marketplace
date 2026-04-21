import { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { useProductViewModel } from "./useProduct.viewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components/Header";
import { CommentItem } from "./components/CommentItem";
import { ListFooter } from "./components/ListFooter";
import { EmptyList } from "./components/EmptyList";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { ProductDetails } from "../../shared/interfaces/http/product-details";
import { AddCardToFooter } from "./components/AddToCartFooter";

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
  productDetails,
  isLoading,
  error,
  comments,
  getCommentsError,
  getCommentsLoading,
  isRefetching,
  handleEndReached,
  handleLoadMore,
  handleRefetch,
  isFetchingNextPage,
  handleAddToCart,
  handleOpenReview,
}) => {
  if (error) return <Error />;
  if (isLoading || !productDetails) return <Loading />;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={
          <Header
            handleOpenReview={handleOpenReview}
            productDetails={productDetails}
          />
        }
        className="px-6"
        onEndReached={handleEndReached}
        onRefresh={handleRefetch}
        refreshing={isRefetching}
        ListFooterComponent={<ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={
          <EmptyList isLoadingComments={getCommentsLoading} />
        }
        contentContainerClassName="pb-6"
      />
      <AddCardToFooter
        product={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
};
