// api-response.model.ts
export interface ApiResponse {
  success: boolean;
  messages: string[];
  httpCode: number;
}

export interface ApiResponseWithData<T = any> extends ApiResponse {
  response: T;
  totalPages: number;
}
