export type ErrorType =
  | "DatabaseError"
  | "ValidateError"
  | "NetworkError"
  | "AuthenticationError"
  | "UnknownError";

export interface Errors extends Error {
  name: ErrorType;
}
