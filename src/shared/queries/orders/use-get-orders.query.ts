import { useQuery } from "@tanstack/react-query";
import { ordersService } from "../../services/orders.service";

export const useGetOrdersQuery = () => {
  const query = useQuery({
    queryFn: ordersService.getOrders,
    queryKey: ["user-orders"],
    staleTime: 1000 * 60 * 10,
  });

  return query;
};
