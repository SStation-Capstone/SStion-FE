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
export enum StationApi {
  CreateStation = '/admin/stations',
  // GetStation = '/admin/stations',
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
    apiClient.get<StationGetRes>({ url: StationApi.GetStation, params: values }),
  );
};
export const useListZone = (values?: InputType) => {
  return useQuery(['listZone', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/1/zones`,
      params: values,
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

export const useCreateZone = () => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/zones`,
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
export const useUpdateZone = () => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/zones/${payload.id}`,
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
export const useDeleteZone = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/zones/${id}`,
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
export const useListStaff = (values?: InputType) => {
  return useQuery(['listStaff', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/1/staffs`,
      params: values,
    }),
  );
};

export const useCreateStaff = () => {
  return useMutation(
    async (payload: PostStaffPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/staffs`,
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
export const useUpdateStaff = () => {
  return useMutation(
    async (payload: PutStaffPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/staffs/${payload.id}`,
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

export const useDeleteStaff = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/staffs/${id}`,
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

export const useListPricing = (values?: InputType) => {
  return useQuery(['listPricing', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/1/pricings`,
      params: values,
    }),
  );
};

export const useCreatePricing = () => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/pricings`,
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
export const useUpdatePricing = () => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/pricings/${payload.id}`,
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

export const useDeletePricing = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/1/pricings/${id}`,
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
