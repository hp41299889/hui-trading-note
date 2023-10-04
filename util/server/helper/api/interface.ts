type ApiStatus = "success" | "failed";

export interface Response<T> {
  status: ApiStatus;
  message: string;
  data: T;
}

export interface ApiResponse<T> {
  statusCode: number;
  response: Response<T>;
}
