import { AxiosError, AxiosResponse } from "axios";
import { Response } from "..";

export type ErrorType =
  | "DatabaseError"
  | "ValidateError"
  | "NetworkError"
  | "AuthenticationError"
  | "UnknownError";

export interface Errors extends AxiosError {
  name: ErrorType;
  response: AxiosResponse<Response<any>>;
}
