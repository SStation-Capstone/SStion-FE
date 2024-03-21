import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/http/tanstack/react-query';

import apiClient from '../apiClient';

import { StationPayload } from './stationService';

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

export interface MangerCreateResponse {
  message: string;
}
export interface MangerUpdateResponse {
  message: string;
}
// & { user: UserInfo };

type ManagerGetRes = PaginationRes & { contends: MangerPayload[] };
export enum ManagerApi {
  GetManager = '/managers',
  CreateManager = '/managers',
  EditManager = '/managers',
  DeleteManager = '/managers',
  AddManagerStations = '/admin/stations/managers',
  CreateStation = '/managers',
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
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};

export const useAddStationManager = () => {
  return useMutation(
    async (payload: StationPayload) =>
      apiClient.post<MangerCreateResponse>({
        url: `${ManagerApi.AddManagerStations}/${payload.id}`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};
export default {
  GetManager,
};
