import { NextResponse } from "next/server";

import { ApiResponse, Response } from "./interface";
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

export const apiErrorHandler = (err: unknown, response: ApiResponse<null>) => {
  console.error(err);
  if (isErrors(err)) {
    switch (err.name) {
      case "DatabaseError": {
        response.statusCode = 400;
        response.response = {
          status: "failed",
          message: err.message,
          data: null,
        };
        return NextResponse.json(response.response, {
          status: response.statusCode,
        });
      }
      case "ValidateError": {
        response.statusCode = 400;
        response.response = {
          status: "failed",
          message: err.message,
          data: null,
        };
        return NextResponse.json(response, { status: response.statusCode });
      }
      default: {
        response.statusCode = 400;
        response.response = {
          status: "failed",
          message: response.response.message,
          data: null,
        };
        return NextResponse.json(response, { status: response.statusCode });
      }
    }
  }
  return NextResponse.json(response, { status: response.statusCode });
};
