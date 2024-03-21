import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/http/tanstack/react-query';

import apiClient from '../apiClient';

import { InputType, PaginationRes } from '#/api';

export interface MangerPayload {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface MangerCreateResponse {
  message: string;
}
// & { user: UserInfo };

type ManagerGetRes = PaginationRes & { contends: MangerPayload[] };
export enum ManagerApi {
  GetManager = '/managers',
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
// export const useUpdateManager = () => {
//   return useMutation(
//     async (payload: MangerPayload) =>
//       apiClient.put<MangerCreateResponse>({
//         url: `${ManagerApi.CreateStation}/${payload.id}`,
//         data: payload,
//       }),
//     {
//       onSuccess: () => {
//         // globalSuccess();
//         queryClient.invalidateQueries(['listStation']);
//       },
//     },
//   );
// };

/**
 * 新建
 */
export const useCreateSManager = () => {
  return useMutation(
    async (payload: MangerPayload) =>
      apiClient.post<MangerCreateResponse>({
        url: ManagerApi.CreateStation,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};
export default {
  GetManager,
};
