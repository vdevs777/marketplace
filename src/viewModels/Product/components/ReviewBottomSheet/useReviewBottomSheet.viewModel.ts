import { useEffect, useState } from "react";
import { useGetUserCommentQuery } from "../../../../shared/queries/comments/use-get-user-comment.query";
import { useCreateCommentMutation } from "../../../../shared/queries/comments/use-create-comment.mutation";
import { useUpdateCommentMutation } from "../../../../shared/queries/comments/use-update-comment.mutation";
import { Toast } from "toastify-react-native";
import { useBottomSheetStore } from "../../../../shared/store/bottomsheet-store";

interface RatingFormInterface {
  content: string;
  rating: number;
  isEditing: boolean;
  commentId?: number;
}

const initialFormValue: RatingFormInterface = {
  content: "",
  isEditing: false,
  rating: 0,
};

export const useReviewBottomSheetViewModel = (productId: number) => {
  const { close: closeBottomSheet } = useBottomSheetStore();
  const [ratingForm, setRatingForm] =
    useState<RatingFormInterface>(initialFormValue);

  const { data: userComment, isLoading: loadingUserComment } =
    useGetUserCommentQuery(productId);

  const createCommentMutation = useCreateCommentMutation(productId);
  const updateCommentMutation = useUpdateCommentMutation(productId);

  console.log(userComment);

  const handleChangeRating = (rating: number) => {
    setRatingForm((prevState) => ({ ...prevState, rating }));
  };

  const handleContentChange = (content: string) => {
    setRatingForm((prevState) => ({ ...prevState, content }));
  };

  const handleFormSubmit = async () => {
    if (ratingForm.rating === 0) {
      Toast.warn("Por favor, selecione uma nota.", "top");
      return;
    }

    if (!ratingForm.content.trim()) {
      Toast.warn("Por favor, escreva um comentário.", "top");
      return;
    }

    const { isEditing, ...formData } = ratingForm;

    if (ratingForm.isEditing) {
      updateCommentMutation.mutate({
        ...formData,
        commentId: formData.commentId!,
      });
    } else {
      createCommentMutation.mutate({
        content: formData.content,
        productId,
        rating: formData.rating,
      });
    }

    closeBottomSheet();
  };

  useEffect(() => {
    if (userComment && userComment.comment) {
      setRatingForm({
        content: userComment.comment.content,
        rating: userComment.rating,
        isEditing: true,
        commentId: userComment.comment.id,
      });
    } else {
      setRatingForm(initialFormValue);
    }
  }, [userComment]);

  const isLoading =
    createCommentMutation.isPending || updateCommentMutation.isPending;

  return {
    handleChangeRating,
    handleContentChange,
    ratingForm,
    handleFormSubmit,
    isLoading,
  };
};
