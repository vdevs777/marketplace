import { useState } from "react";
import { useCartStore } from "../../../../shared/store/cart-store";
import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { useSubmitOrderMutation } from "../../../../shared/queries/orders/use-submit-order.mutation";
import { router } from "expo-router";
import { useAppModal } from "../../../../shared/hooks/useAppModal";

export const useCartFooterViewModel = () => {
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<CreditCard | null>(null);
  const { total, products, clearCart } = useCartStore();
  const { showSuccess } = useAppModal();

  const createOrderMutation = useSubmitOrderMutation();

  const submitOrderMutation = async () => {
    if (!selectedCreditCard) return;
    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard?.id,
      items: products.map(({ id, quantity }) => ({ quantity, productId: id })),
    });

    clearCart();
    showSuccess({
      title: "Sucesso!",
      message: "Pedido feito com sucesso!",
      buttonText: "Ver pedidos",
      onButtonPress: () => {
        router.push("/orders");
      },
    });
    router.push("/orders");
  };

  return {
    total,
    selectedCreditCard,
    setSelectedCreditCard,
    submitOrderMutation,
    isOrderLoading: createOrderMutation.isPending,
  };
};
