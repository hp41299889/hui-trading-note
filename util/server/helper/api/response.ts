import { NextResponse } from "next/server";

import { ApiResponse } from "./interface";
import { isErrors } from "@/util/server";

export const response: ApiResponse<any> = {
  statusCode: 500,
  response: {
    status: "failed",
    message: "server error",
    data: null,
  },
};

export const apiResponse = <T>(response: ApiResponse<T>) => {
  return NextResponse.json(response.response, { status: response.statusCode });
};

export const apiErrorHandler = (err: unknown) => {
  console.error(err);
  const r = { ...response };
  if (isErrors(err)) {
    switch (err.name) {
      case "DatabaseError": {
        r.statusCode = 400;
        r.response = {
          status: "failed",
          message: err.message,
          data: null,
        };
        return NextResponse.json(r, { status: r.statusCode });
      }
      case "ValidateError": {
        r.statusCode = 400;
        r.response = {
          status: "failed",
          message: err.message,
          data: null,
        };
        return NextResponse.json(r, { status: r.statusCode });
      }
      default: {
        return NextResponse.json(r, { status: r.statusCode });
      }
    }
  }
  return NextResponse.json(r, { status: r.statusCode });
};
