import { useQuery } from '@tanstack/react-query';

import apiClient from '@/api/apiClient';

import { PaginationRes } from '#/api';
import { ImageUrl } from '#/entity';

interface PackagePayload {
  id: number;
  name: string;
  status: string;
  description: string;
  formatTotalPrice: string;
  packageImages: any;
  priceCod: string;
}
export interface StationPayload {
  contends: any;
  id: number;
  name: string;
  address: string;
  description: string;
  contactPhone: string;
  latitude?: string;
  longitude?: string;
  stationImages?: ImageUrl[];
}

interface UserCountData {
  month: number;
  year: number;
  userCount: number;
}

type PackageGetRes = PaginationRes & { contends: PackagePayload[] };
type StationGetRes = PaginationRes & { contends: StationPayload[] };
export enum DashboardApi {
  Packages = '/packages',
  Payments = '/payments',
  UserCountByMonth = '/admin/user-count-by-month',
}

interface PackagesQuery {
  checkIn: string;
  StationId?: string;
}

interface PayementQuery {
  StationId?: string;
}

interface UserCountByMonthQuery {
  Year?: string;
}
export const useListPackagesDashboard = (values?: PackagesQuery) => {
  const valueCheckIn = 'Statuses=Initialized&Statuses=Paid';
  const valueCheckOut = 'Statuses=Returned&Statuses=Completed';
  return useQuery(['listPackages', values], () =>
    apiClient.get<PackageGetRes>({
      url: `${DashboardApi.Packages}?${
        values?.checkIn === 'checkIn' ? valueCheckIn : valueCheckOut
      }&PageSize=7`,
      params: { StationId: values?.StationId },
    }),
  );
};

export const useListOrdersHistoryDashboard = (values?: PayementQuery) => {
  return useQuery(['listOrdersHistory', values], () =>
    apiClient.get<StationGetRes>({ url: DashboardApi.Payments, params: values }),
  );
};

export const useListUserCountByMonth = (values?: UserCountByMonthQuery) => {
  return useQuery(['listUserCountByMonth', values], () =>
    apiClient.get<UserCountData[]>({ url: DashboardApi.UserCountByMonth, params: values }),
  );
};
