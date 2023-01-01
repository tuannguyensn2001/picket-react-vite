import { AxiosError } from "axios";

export type ApiResponse<T = any> = {
  message: string;
  data: T;
};

export type ApiResponseError = AxiosError<ApiResponse>;
