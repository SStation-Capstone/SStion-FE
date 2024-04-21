import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import apiClient from '@/api/apiClient';
import { queryClient } from '@/http/tanstack/react-query';

import { PaginationRes } from '#/api';

export interface MangerPayload {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  avatarUrl: string;
  password: string;
}

interface UserPayload {
  email?: string;
  fullName?: string;
  isActive?: boolean;
  id: string;
}
enum Role {
  AMDIN = 'Admin',
  USER = 'User',
  STATIONMANAGER = 'StationManager',
  STAFF = 'Staff',
}
export interface UsersQueryType {
  Search?: string;
  IsActive?: boolean;
  PageIndex?: number;
  Role?: Role;
  PageSize?: number;
  // Statuses?: string;
}

export interface MangerCreateResponse {
  message: string;
}
export interface MangerUpdateResponse {
  message: string;
}
// & { user: UserInfo };

type UserGetRes = PaginationRes & { contends: MangerPayload[] };
export enum UserApi {
  GetUser = '/admin/users',
  CreateUser = '/admin/users',
  EditUser = '/admin/users',
  DeleteUser = '/admin/users',
  CreateStation = '/admin/users',
}

// const createUser = (data: MangerPayload) =>
//   apiClient.post<MangerCreateResponse>({ url: UserApi.GetUser, data });

// const GetUserList = () => apiClient.get<UserGetRes>({ url: UserApi.GetUser });
export const useListUser = (values?: UsersQueryType) => {
  return useQuery(['listUser', values], () =>
    apiClient.get<UserGetRes>({ url: UserApi.GetUser, params: values }),
  );
};
// const editUserUrl = UserApi.EditUser.replace('{id}', payload.id?.toString());
// const url = `${editUserUrl}/${payload.id}`; // Sử dụng editUserUrl thay vì UserApi.EditUser

// apiClient.put<MangerCreateResponse>({
//   url,
//   data: payload,
// });

export const useUpdateUser = () => {
  return useMutation(
    async (payload: UserPayload) => {
      return apiClient.put<MangerCreateResponse>({
        url: `${UserApi.EditUser}/${payload.id}`,
        data: payload,
      });
    },
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Update user sucessfully');
        queryClient.invalidateQueries(['listUser']);
      },
    },
  );
};

export const useDeleteUser = () => {
  return useMutation(
    async (payload: MangerPayload) => {
      return apiClient.delete<MangerCreateResponse>({
        url: `${UserApi.DeleteUser}/${payload.id}`,
        data: payload,
      });
    },
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete user sucessfully');
        queryClient.invalidateQueries(['listUser']);
      },
    },
  );
};

/**
 * 新建
 */
export const useCreateSUser = () => {
  return useMutation(
    async (payload: MangerPayload) =>
      apiClient.post<MangerCreateResponse>({
        url: UserApi.CreateUser,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create user sucessfully');
        queryClient.invalidateQueries(['listUser']);
      },
    },
  );
};

// export default {
//   GetUser,
// };
