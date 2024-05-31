import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import apiClient from '@/api/apiClient';
import { queryClient } from '@/http/tanstack/react-query';

import { InputType, PaginationRes } from '#/api';

export interface MangerPayload {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  avatarUrl: string;
  password: string;
}

interface StationImage {
  id: number;
  imageUrl: string;
}

interface Pricing {
  id: number;
  startTime: number;
  endTime: number;
  price: number;
  formatPrice: string;
  stationId: number;
}

interface StationByManger {
  id: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  deletedBy: string;
  deletedAt: string;
  name: string;
  description: string;
  contactPhone: string;
  address: string;
  latitude: string;
  longitude: string;
  balance: number;
  formatBalance: string;
  stationImages: StationImage[];
  pricings: Pricing[];
}
export interface AddToStationPayload {
  id: string;
  station: string;
}
export interface MangerCreateResponse {
  message: string;
}
export interface MangerUpdateResponse {
  message: string;
}
// & { user: UserInfo };

type ManagerGetRes = PaginationRes & { contends: MangerPayload[] };
type StationByMangerRes = PaginationRes & { contends: StationByManger[] };

export enum ManagerApi {
  GetManager = '/managers',
  CreateManager = '/managers',
  EditManager = '/managers',
  DeleteManager = '/managers',
  AddManagerStations = '/admin/stations',
  CreateStation = '/managers',
  GetStationByManager = '/admin/managers',
}

// const createManager = (data: MangerPayload) =>
//   apiClient.post<MangerCreateResponse>({ url: ManagerApi.GetManager, data });

const GetManager = () => apiClient.get<ManagerGetRes>({ url: ManagerApi.GetManager });
export const useListManager = (values?: InputType) => {
  return useQuery(['listManager', values], () =>
    apiClient.get<ManagerGetRes>({ url: ManagerApi.GetManager, params: values }),
  );
};
// const editManagerUrl = ManagerApi.EditManager.replace('{id}', payload.id?.toString());
// const url = `${editManagerUrl}/${payload.id}`; // Sử dụng editManagerUrl thay vì ManagerApi.EditManager

// apiClient.put<MangerCreateResponse>({
//   url,
//   data: payload,
// });

export const useListStationByManager = (id: string) => {
  return useQuery(['listStationByManager', id], () =>
    apiClient.get<StationByMangerRes>({ url: `${ManagerApi.GetStationByManager}/${id}/stations` }),
  );
};
export const useUpdateManager = () => {
  return useMutation(
    async (payload: MangerPayload) => {
      return apiClient.put<MangerCreateResponse>({
        url: `${ManagerApi.EditManager}/${payload.id}`,
        data: payload,
      });
    },
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Update manager sucessfully');
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};

export const useDeleteManager = () => {
  return useMutation(
    async (payload: MangerPayload) => {
      return apiClient.delete<MangerCreateResponse>({
        url: `${ManagerApi.DeleteManager}/${payload.id}`,
        data: payload,
      });
    },
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete manager sucessfully');
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};

/**
 * 新建
 */
export const useCreateSManager = () => {
  return useMutation(
    async (payload: MangerPayload) =>
      apiClient.post<MangerCreateResponse>({
        url: ManagerApi.CreateManager,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create manager sucessfully');
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};

export const useAddStationManager = () => {
  return useMutation(
    async (payload: AddToStationPayload) =>
      apiClient.post<MangerCreateResponse>({
        url: `${ManagerApi.AddManagerStations}/${payload.id}/managers`,
        data: { userId: payload.station },
      }),
    {
      onSuccess: () => {
        message.success('Add manager to station sucessfully');
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};

export const useChangeManager = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<MangerCreateResponse>({
        url: `${ManagerApi.AddManagerStations}/${payload.id}/managers`,
        data: { userId: payload.manager },
      }),
    {
      onSuccess: () => {
        message.success('Change manager sucessfully!!!');
        queryClient.invalidateQueries(['listStationAdmin']);
      },
    },
  );
};
export default {
  GetManager,
};
