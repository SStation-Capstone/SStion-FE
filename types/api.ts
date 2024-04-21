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
  totalItems: number;
}

export interface InputType {
  Search?: string;
  PageIndex?: number;
  PageSize?: number;
  Statuses?: string;
}
