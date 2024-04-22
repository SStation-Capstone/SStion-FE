import { useQuery } from '@tanstack/react-query';

import apiClient from '@/api/apiClient';

import { InputType, PaginationRes } from '#/api';

export enum StatusEnum {
  DEPOSTIE = 'Initialized',
  WITHDRAW = 'Returned',
  PAY = 'Paid',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
  EXPIRED = 'Expired',
}
export interface PackageHistoryData {
  name: string;
  description: string;
  status: string;
  type: StatusEnum;
  userId: string;
  id: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  deletedBy: string | null;
  deletedAt: string | null;
  packageId: string;
}

export interface StationCreateResponse {
  message: string;
}
// & { user: UserInfo };
type StationGetRes = PaginationRes & { contends: PackageHistoryData[] };
export enum PackageHisotryApi {
  GetPackageHisotry = '/package-status-histories',
}

export const useListPackageHisotry = (values?: InputType) => {
  return useQuery(['listPackageHisotry', values], () =>
    apiClient.get<StationGetRes>({ url: PackageHisotryApi.GetPackageHisotry, params: values }),
  );
};

export const useListPackageHisotryById = (id: string) => {
  return useQuery(['listPackageHisotryById'], () =>
    apiClient.get<StationGetRes>({ url: `${PackageHisotryApi.GetPackageHisotry}/${id}` }),
  );
};
