import { OrderResult } from "binance";

import { nextApi } from "./request";
import { Response } from "@/util/server";

// order
export const getOrders = async (userId: string, type: string) => {
  return nextApi.get<Response<OrderResult[]>>(
    `/user/${userId}/order?type=${type}`
  );
};
