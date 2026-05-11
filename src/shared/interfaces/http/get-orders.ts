import { Order } from "../order";

export interface GetOrdersResponse {
  orders: Order[];
  totalOrders: number;
}
