import { Secret } from "@prisma/client";

import { createUSDMClient } from "./binance";

export const createClient = async (secret: Secret) => {
  try {
    const { type, apiKey, secretKey } = secret;
    switch (type) {
      case "binance": {
        return createUSDMClient(apiKey, secretKey);
      }
      default: {
        return createUSDMClient(apiKey, secretKey);
      }
    }
  } catch (err) {
    throw err;
  }
};
