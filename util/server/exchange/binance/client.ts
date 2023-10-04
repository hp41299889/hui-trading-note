import { USDMClient } from "binance";

export const createUSDMClient = async (apiKey: string, secretKey: string) => {
  try {
    const client = new USDMClient({
      api_key: apiKey,
      api_secret: secretKey,
    });
    return client;
  } catch (err) {
    throw err;
  }
};
