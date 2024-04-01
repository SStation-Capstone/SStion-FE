import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';

import apiClient from '../apiClient';

import { InputType, PaginationRes } from '#/api';
import { ImageUrl } from '#/entity';

export interface StationPayload {
  id: number;
  name: string;
  address: string;
  description: string;
  contactPhone: string;
  latitude?: string;
  longitude?: string;
  stationImages?: ImageUrl[];
}
export interface PackagePayload {
  id: number;
  name: string;
  status: string;
  description: string;
  formatTotalPrice: string;
  packageImages: any;
  priceCod: string;
}

export interface ZonePayload {
  id: number;
  name: string;
  description: string;
}
export interface PostStaffPayload {
  userName: string;
  fullName: string;
  password: string;
}
export interface PricingPayload {
  id: number;
  fromDate: number;
  toDate: number;
  price: number;
}
export interface PutStaffPayload {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
}
export interface ShelfPayload {
  name: string;
  description: string;
  index: number;
  width: number;
  height: number;
  length: number;
  zoneId: any;
  numberOfRacks: number;
  numberOfSlotsPerRack: number;
  slot: object;
}
export interface CheckInPayload {
  name: string;
  description: string;
  priceCod: number;
  isCod: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  stationId: number;
  senderId: string;
  receiverId: string;
  packageImages: any[];
}
export interface StationCreateResponse {
  message: string;
}
// & { user: UserInfo };
type StationGetRes = PaginationRes & { contends: StationPayload[] };
type PackageGetRes = PaginationRes & { contends: PackagePayload[] };
export enum StationApi {
  CreateStation = '/admin/stations',
  GetListStation = '/managers/stations',
  GetStation = '/stations',
  GetShelfs = '/shelfs',
  Packages = '/packages',
  Staffs = '/staffs',
}

const createStation = (data: StationPayload) =>
  apiClient.post<StationCreateResponse>({ url: StationApi.CreateStation, data });

const getStation = () => apiClient.get<StationGetRes>({ url: StationApi.GetStation });

export const useListStation = (values?: InputType) => {
  return useQuery(['listStation', values], () =>
    apiClient.get<StationGetRes>({ url: StationApi.GetListStation, params: values }),
  );
};
export const useListZone = (values?: any) => {
  return useQuery(['listZone', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/zones`,
      // params: values,
    }),
  );
};
export const useListShelf = (values: String) => {
  return useQuery(['listShelf', values], () =>
    apiClient.get<StationGetRes>({
      url: StationApi.GetShelfs,
      params: { zoneId: values },
    }),
  );
};

export const useCreateZone = (values?: any) => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};
export const useUpdateZone = (values?: any) => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones/${payload.id}`,
        data: {
          name: payload.name,
          description: payload.description,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};
export const useDeleteZone = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};

export const useCreateShelf = () => {
  return useMutation(
    async (payload: ShelfPayload) =>
      apiClient.post<StationCreateResponse>({
        url: StationApi.GetShelfs,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create shelf sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};

export const useDeleteShelf = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetShelfs}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete Shelf sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};

export const useUpdateStation = () => {
  return useMutation(
    async (payload: StationPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.CreateStation}/${payload.id}`,
        data: payload,
      }),
    {
      onSuccess: () => {
        message.success('Update station sucessfully');
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};

/**
 * 新建
 */
export const useCreateStation = () => {
  return useMutation(
    async (payload: StationPayload) =>
      apiClient.post<StationCreateResponse>({
        url: StationApi.CreateStation,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create station sucessfully');
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};

export const useDeleteStation = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.CreateStation}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete station sucessfully');
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};

export const useCreateCheckIn = () => {
  return useMutation(
    async (payload: CheckInPayload) =>
      apiClient.post<StationCreateResponse>({
        url: StationApi.Packages,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create check in sucessfully');
        queryClient.invalidateQueries(['listCheckIn']);
      },
    },
  );
};
export const useListStaff = (values?: any) => {
  return useQuery(['listStaff', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/staffs`,
      // params: values,
    }),
  );
};

export const useCreateStaff = (values?: any) => {
  return useMutation(
    async (payload: PostStaffPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};
export const useUpdateStaff = (values?: any) => {
  return useMutation(
    async (payload: PutStaffPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs/${payload.id}`,
        data: {
          email: payload.email,
          fullName: payload.fullName,
          avatarUrl: payload.avatarUrl,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};

export const useDeleteStaff = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete Staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};

export const useListPricing = (values?: any) => {
  return useQuery(['listPricing', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/pricings`,
      // params: values,
    }),
  );
};

export const useCreatePricing = (values?: any) => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};
export const useUpdatePricing = (values?: any) => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings/${payload.id}`,
        data: {
          fromDate: payload.fromDate,
          toDate: payload.toDate,
          price: payload.price,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};

export const useDeletePricing = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};
export const useGetCheckOut = (id?: string) => {
  return useQuery(['checkOut'], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.Packages}/${id}`,
    }),
  );
};
export const useCreateCheckOut = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/${payload.id}/${payload.status}`,
        data: {},
      }),
    {
      onSuccess: () => {
        message.success('Create check in sucessfully');
      },
    },
  );
};
export const useListPackages = (values?: string) => {
  const valueCheckIn = 'Statuses=Initialized&Statuses=Paid';
  const valueCheckOut = 'Statuses=Returned&Statuses=Completed';
  return useQuery(['listPackages', values], () =>
    apiClient.get<PackageGetRes>({
      url: `${StationApi.Packages}?${
        values === 'checkIn' ? valueCheckIn : valueCheckOut
      }&PageSize=8`,
    }),
  );
};
