import { NextRequest } from "next/server";

import {
  response,
  apiErrorHandler,
  apiResponse,
  prisma,
  createClient,
} from "@/util/server";
import { Exchange } from "@prisma/client";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const r = { ...response };
  const { userId } = params;
  const { searchParams } = req.nextUrl;
  try {
    const exchange = searchParams.get("type") as Exchange;
    if (!exchange) {
      r.statusCode = 400;
      r.response = {
        status: "failed",
        message: "read order fail",
        data: null,
      };
    } else {
      const secret = await prisma.secret.findFirst({
        where: { userId, exchange },
      });
      if (!secret) {
        r.statusCode = 400;
        r.response = {
          status: "failed",
          message: "read position fail",
          data: null,
        };
      } else {
        const client = await createClient(secret);
        const positions = (await client.getPositions()).filter(
          (p) => Number(p.positionAmt) !== 0
        );
        r.statusCode = 200;
        r.response = {
          status: "success",
          message: "read position success",
          data: positions,
        };
      }
    }
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
