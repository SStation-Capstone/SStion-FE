import apiClient from '../apiClient';

import { PaginationRes } from '#/api';

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

type StationGetRes = PaginationRes & { contends: MangerPayload[] };
export enum ManagerApi {
  GetManager = '/managers',
}

// const createManager = (data: MangerPayload) =>
//   apiClient.post<MangerCreateResponse>({ url: ManagerApi.GetManager, data });

const GetManager = () => apiClient.get<StationGetRes>({ url: ManagerApi.GetManager });

export default {
  GetManager,
};
