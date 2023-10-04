import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import { response, apiErrorHandler, apiResponse, prisma } from "@/util/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const r = { ...response };
  const id = Number(params.id);
  try {
    const payload: Prisma.SecretUpdateWithoutUserInput = await req.json();
    const secret = await prisma.secret.update({
      where: { id },
      data: payload,
    });
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "update secret success",
      data: secret,
    };
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: { id: number } }
) => {
  const r = { ...response };
  try {
    const id = Number(params.id);
    const secret = await prisma.secret.delete({ where: { id } });
    r.statusCode = 200;
    r.response = {
      status: "success",
      message: "delete secret success",
      data: secret,
    };
  } catch (err) {
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
