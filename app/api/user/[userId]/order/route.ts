import { NextRequest } from "next/server";
import { OrderResult } from "binance";

import {
  response,
  apiErrorHandler,
  apiResponse,
  prisma,
  createClient,
} from "@/util/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const r = { ...response };
  const { userId } = params;
  const { searchParams } = req.nextUrl;
  try {
    const type = searchParams.get("type");
    if (!type) {
      r.statusCode = 400;
      r.response = {
        status: "failed",
        message: "read order fail",
        data: null,
      };
    } else {
      const secret = await prisma.secret.findFirst({
        where: { userId, type },
      });
      if (!secret) {
        r.statusCode = 400;
        r.response = {
          status: "failed",
          message: "read order fail",
          data: null,
        };
      } else {
        const client = await createClient(secret);
        const orders = await client.getAllOpenOrders();
        syncOrder(userId, orders);
        r.statusCode = 200;
        r.response = {
          status: "success",
          message: "read order success",
          data: orders,
        };
      }
    }
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};

const syncOrder = async (userId: string, orders: OrderResult[]) => {
  const newOrderIds = orders.map((o) => String(o.orderId));

  const ordersToDelete = await prisma.order.findMany({
    where: {
      userId,
      NOT: {
        id: {
          in: newOrderIds,
        },
      },
    },
  });

  const toDeleteOrderIds = ordersToDelete.map((o) => o.id);
  await prisma.$transaction([
    ...orders.map((o) =>
      prisma.order.upsert({
        where: { id: String(o.orderId) },
        update: {
          price: Number(o.price),
          amount: Number(o.origQty),
        },
        create: {
          userId,
          id: String(o.orderId),
          price: Number(o.price),
          amount: Number(o.origQty),
        },
      })
    ),
    prisma.order.deleteMany({
      where: {
        id: {
          in: toDeleteOrderIds,
        },
      },
    }),
  ]);
};
