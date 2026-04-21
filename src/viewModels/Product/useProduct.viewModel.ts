import { createElement } from "react";
import { useGetCommentsInfiniteQuery } from "../../shared/queries/product/use-get-product-comments-infinite.query";
import { useGetProductDetailsQuery } from "../../shared/queries/product/use-get-product-details.query";
import { useCartStore } from "../../shared/store/cart-store";
import { useModalStore } from "../../shared/store/modal-store";
import { AddToCartSuccessModal } from "./components/AddToCartSuccessModal";
import { router } from "expo-router";
import { useBottomSheetStore } from "../../shared/store/bottomsheet-store";
import { ReviewBottomSheet } from "./components/ReviewBottomSheet";

export const useProductViewModel = (productId: number) => {
  const { addProduct } = useCartStore();
  const { open, close } = useModalStore();
  const { open: openBottomSheet } = useBottomSheetStore();

  const {
    data: productDetails,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const {
    comments,
    isLoading: getCommentsLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    error: getCommentsError,
    isRefetching,
    isFetchingNextPage,
  } = useGetCommentsInfiniteQuery(productId);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const handleRefetch = () => {
    if (!isRefetching) refetch();
  };

  const handleEndReached = () => handleLoadMore();

  const onGoToCart = () => {
    router.push("/(private)/(tabs)/cart");
    close();
  };

  const onContinueShopping = () => {
    router.push("/(private)/(tabs)/cart");
    close();
  };

  const handleAddToCart = () => {
    if (!productDetails) return;

    addProduct({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.value,
      image: productDetails.photo,
    });

    open(
      createElement(AddToCartSuccessModal, {
        productName: productDetails.name,
        onGoToCart,
        onClose: close,
        onContinueShopping,
      }),
    );
  };

  const handleOpenReview = () => {
    if (!productDetails) return;

    openBottomSheet({
      content: createElement(ReviewBottomSheet, { productId }),
    });
  };

  return {
    productDetails,
    isLoading,
    error,
    comments,
    getCommentsLoading,
    getCommentsError,
    handleEndReached,
    handleRefetch,
    isRefetching,
    handleLoadMore,
    isFetchingNextPage,
    handleAddToCart,
    handleOpenReview,
  };
};
