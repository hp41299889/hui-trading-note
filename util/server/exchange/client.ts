import { Secret } from "@prisma/client";

import { createUSDMClient } from "./binance";
import { unknownErorr } from "..";

export const createClient = async (secret: Secret) => {
  try {
    const { exchange, apiKey, secretKey } = secret;
    switch (exchange) {
      case "BINANCE": {
        return createUSDMClient(apiKey, secretKey);
      }
      default: {
        return createUSDMClient(apiKey, secretKey);
      }
    }
  } catch (err) {
    throw unknownErorr("create exchange client error");
  }
};
