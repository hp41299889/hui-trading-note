import { NextRequest } from "next/server";

import { response, apiErrorHandler, apiResponse, prisma } from "@/util/server";
import { Prisma } from "@prisma/client";

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const r = { ...response };
  const { userId } = params;
  try {
    const payload: Prisma.SecretCreateWithoutUserInput = await req.json();
    const secret = await prisma.secret.create({
      data: { userId, ...payload },
    });
    r.statusCode = 201;
    r.response = {
      status: "success",
      message: "create secret success",
      data: secret,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const r = { ...response };
  const { userId } = params;
  try {
    const secrets = await prisma.secret.findMany({
      where: { userId },
    });
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "read secrets success",
      data: secrets,
    };
  } catch (err) {
    return apiErrorHandler(err, r);
  }
  return apiResponse(r);
};
