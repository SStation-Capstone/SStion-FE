import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import apiClient from '@/api/apiClient';
import { queryClient } from '@/http/tanstack/react-query';

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

export interface StationCreateResponse {
  message: string;
}
// & { user: UserInfo };
type StationGetRes = PaginationRes & { contends: StationPayload[] };
export enum StationApi {
  CreateStation = '/admin/stations',
  GetStation = '/admin/stations',
}

const createStation = (data: StationPayload) =>
  apiClient.post<StationCreateResponse>({ url: StationApi.CreateStation, data });

const getStation = () => apiClient.get<StationGetRes>({ url: StationApi.GetStation });

export const useListStation = (values?: InputType) => {
  return useQuery(['listStationAdmin', values], () =>
    apiClient.get<StationGetRes>({ url: StationApi.GetStation, params: values }),
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
        queryClient.invalidateQueries(['listStationAdmin']);
        queryClient.invalidateQueries(['listStationByManager']);
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
        queryClient.invalidateQueries(['listStationAdmin']);
        queryClient.invalidateQueries(['listStationByManager']);
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
        queryClient.invalidateQueries(['listStationAdmin']);
      },
    },
  );
};
