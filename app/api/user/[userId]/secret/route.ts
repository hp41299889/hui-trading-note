import { NextRequest } from "next/server";

import { response, apiErrorHandler, apiResponse, prisma } from "@/util/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const r = { ...response };
  const { userId } = params;
  try {
    const payload = await req.json();
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
    return apiErrorHandler(err);
  }
  return apiResponse(r);
};
