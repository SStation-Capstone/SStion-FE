import apiClient from '../apiClient';

import { PaginationRes } from '#/api';
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

export default {
  createStation,
  getStation,
};
