import { nextApi } from "./request";
import { Response } from "@/util/server";
import { Prisma, Secret } from "@prisma/client";

// secret

export const postSecret = async (
  userId: string,
  payload: Prisma.SecretCreateWithoutUserInput
) => {
  return nextApi.post<Response<Secret>>(`/user/${userId}/secret`, payload);
};

export const patchSecret = async (
  userId: string,
  secretId: string,
  payload: Prisma.SecretUpdateWithoutUserInput
) => {
  return nextApi.patch<Response<Secret>>(
    `/user/${userId}/secret/${secretId}`,
    payload
  );
};
