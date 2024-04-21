import { useQuery } from '@tanstack/react-query';

import apiClient from '@/api/apiClient';

import { InputType, PaginationRes } from '#/api';

export enum TransactionEnum {
  DEPOSTIE = 'Deposite',
  WITHDRAW = 'Withdraw',
  PAY = 'Pay',
  RECEIVE = 'Receive',
}
export interface TransactionData {
  description: string;
  amount: number;
  status: string;
  type: TransactionEnum;
  url: string | null;
  method: string;
  userId: string;
  user: {
    userName: string;
    avatarUrl: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    fullName: string;
    isActive: boolean;
    isDeleted: boolean;
    wallet: {
      balance: number;
      formatBalance: string;
      lastDepositAt: string | null;
      id: number;
      createdBy: string;
      createdAt: string;
      modifiedBy: string;
      modifiedAt: string;
      deletedBy: string | null;
      deletedAt: string | null;
    };
    devices: {
      id: number;
      token: string;
    }[];
    roles: {
      id: string;
      name: string;
    }[];
    id: string;
    createdBy: string;
    createdAt: string;
    modifiedBy: string;
    modifiedAt: string;
    deletedBy: string | null;
    deletedAt: string | null;
  };
  id: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  deletedBy: string | null;
  deletedAt: string | null;
}

export interface StationCreateResponse {
  message: string;
}
// & { user: UserInfo };
type StationGetRes = PaginationRes & { contends: TransactionData[] };
export enum TransactionApi {
  GetTransaction = '/admin/transactions',
}

export const useListTransaction = (values?: InputType) => {
  return useQuery(['listTransaction', values], () =>
    apiClient.get<StationGetRes>({ url: TransactionApi.GetTransaction, params: values }),
  );
};

export const useListTransactionById = (id: string) => {
  return useQuery(['listTransactionById'], () =>
    apiClient.get<StationGetRes>({ url: `${TransactionApi.GetTransaction}/${id}` }),
  );
};
