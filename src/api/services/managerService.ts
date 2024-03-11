import apiClient from '../apiClient';

export interface MangerPayload {
  userName: string;
  password: string;
  fullName: string;
}

export interface MangerCreateResponse {
  message: string;
}
// & { user: UserInfo };

export enum ManagerApi {
  CreateManager = '/managers',
}

const createManager = (data: MangerPayload) =>
  apiClient.post<MangerCreateResponse>({ url: ManagerApi.CreateManager, data });

export default {
  createManager,
};
