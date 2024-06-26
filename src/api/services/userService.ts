// eslint-disable-next-line import/no-cycle
import apiClient from '../apiClient';

import { StationPayload } from './stationService';

import { UserInfo, UserToken } from '#/entity';

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}
export type SignInRes = UserToken;
// & { user: UserInfo };

export enum UserApi {
  SignIn = '/auth/login',
  SignUp = '/auth/signup',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  User = '/user',
  Station = '/staffs/stations',
  StationManager = '/managers/stations',
}

const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.get({ url: UserApi.Logout });
const findById = (id: string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });
const getStation = () => apiClient.get<StationPayload>({ url: `${UserApi.Station}` });
const getStationManager = () => apiClient.get<StationPayload>({ url: `${UserApi.StationManager}` });

export default {
  signin,
  signup,
  findById,
  logout,
  getStation,
  getStationManager,
};
