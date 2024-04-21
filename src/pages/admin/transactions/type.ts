import { TransactionEnum } from '@/api/services/admin/transactionService';

export interface QueryInput {
  PageIndex?: number;
  PageSize?: number;
  Statuses?: string;
  Type?: TransactionEnum;
  From?: string;
  To?: string;
}
