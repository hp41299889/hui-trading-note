import { Errors } from "./interface";

const createError = (message: string): Errors => {
  return new Error(message) as Errors;
};

export const isErrors = (err: unknown): err is Errors => {
  return err instanceof Error
    ? "name" in err && typeof err.name === "string"
    : false;
};

export const databaseError = (message: string): Errors => {
  const error = createError(message);
  error.name = "DatabaseError";
  return error;
};

export const validateError = (message: string): Errors => {
  const error = createError(message);
  error.name = "ValidateError";
  return error;
};

export const networkError = (message: string): Errors => {
  const error = createError(message);
  error.name = "NetworkError";
  return error;
};

export const authenticationError = (message: string): Errors => {
  const error = createError(message);
  error.name = "AuthenticationError";
  return error;
};

export const unknownErorr = (message: string): Errors => {
  const error = createError(message);
  error.name = "UnknownError";
  return error;
};
