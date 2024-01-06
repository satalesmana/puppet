export interface ApiResponse<T, K> {
  data: T;
  message: K;
}

export interface ApiResponsePagination<T, P, K> {
  data: T;
  pagination: P;
  message: K;
}
