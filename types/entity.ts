import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  role?: string;
  // status?: BasicStatus;
  permissions?: Permission[];
  stationId?: number;
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}

export interface JwtDecode {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  id: string;
  user_name: string;
  avartar_url: string;
  email: string;
}

export interface ImageUrl {
  imageUrl: string;
}
export interface Station {
  id: number;
  name: string;
  address: string;
  description: string;
  contactPhone: string;
  latitude?: string;
  longitude?: string;
  stationImages?: ImageUrl[];
}

export interface Staff {
  avatarUrl: string;
  id: number;
  userName: string;
  password: string;
  fullName: string;
}
export interface Pricing {
  id: number;
  fromDate: number;
  toDate: number;
  price: number;
}
export interface Zone {
  id: number;
  name: string;
  description: string;
}
export interface Shelf {
  id: number;
  name: string;
  index: number;
  width: number;
  height: number;
  length: number;
  zoneId: number;
  numberOfRacks: number;
  numberOfSlotsPerRack: number;
  slot: object;
}
export interface Manager {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  avatarUrl: string;
  password: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  avatarUrl: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  role: any;
}
