export interface Result<T = any> {
  status: number;
  message: string;
  data?: T;
}

export interface PaginationRes {
  page: number;
  size: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
