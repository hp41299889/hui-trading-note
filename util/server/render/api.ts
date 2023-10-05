import "server-only";
import { Secret } from "@prisma/client";
import { OrderResult } from "binance";

import { nextApi } from "./request";
import { Errors, Response, isErrors } from "@/util/server";

// order
export const getOrders = async (userId: string, exchange: string) => {
  try {
    const res = await nextApi.get<Response<OrderResult[]>>(
      `/user/${userId}/order?exchange=${exchange}`
    );
    return res.data.data;
  } catch (err) {
    if (isErrors(err)) {
      return err.response?.data.message;
    } else {
      return [];
    }
  }
};

// secret
export const getSecret = async (userId: string) => {
  return nextApi.get<Response<Secret[]>>(`/user/${userId}/secret`);
};
