import { marketPlaceApiClient } from "../api/market-place";
import { GetOrdersResponse } from "../interfaces/http/get-orders";
import {
  OrdersRequestParams,
  SubmitOrdersResponse,
} from "../interfaces/http/submit-orders";

const submitOrder = async (order: OrdersRequestParams) => {
  const { data } = await marketPlaceApiClient.post<SubmitOrdersResponse>(
    "/orders",
    order,
  );

  return data;
};

const getOrders = async () => {
  const { data } = await marketPlaceApiClient.get<GetOrdersResponse>("/orders");
  return data;
};

export const ordersService = { submitOrder, getOrders };
