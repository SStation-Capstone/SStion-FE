import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { queryClient } from '@/http/tanstack/react-query';

// eslint-disable-next-line import/no-cycle
import apiClient from '../apiClient';

import { InputType, PaginationRes } from '#/api';
import { ImageUrl } from '#/entity';

export interface StationPayload {
  contends: any;
  id: number;
  name: string;
  address: string;
  description: string;
  contactPhone: string;
  latitude?: string;
  longitude?: string;
  stationImages?: ImageUrl[];
}
export interface PackagePayload {
  id: number;
  name: string;
  status: string;
  description: string;
  formatTotalPrice: string;
  packageImages: any;
  priceCod: string;
}

export interface ZonePayload {
  id: number;
  name: string;
  description: string;
}
export interface PostStaffPayload {
  userName: string;
  fullName: string;
  password: string;
}
export interface PricingPayload {
  id: number;
  startTime: number;
  endTime: number;
  unitDuration: number;
  pricePerUnit: number;
}

export interface PutStaffPayload {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
}

export interface ShelfPayload {
  name: string;
  description: string;
  // index: number;
  // width: number;
  // height: number;
  // length: number;
  zoneId: any;
  numberOfRacks: number;
  numberOfSlotsPerRack: number;
  slot: object;
}
export interface CheckInPayload {
  name: string;
  description: string;
  priceCod: number;
  isCod: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  stationId: number;
  zoneId: number;
  shelfId: any;
  rackId: any;
  slotId: any;
  senderId: string;
  receiverId: string;
  packageImages: any[];
}
export interface CheckInForcePayload {
  name: string;
  description: string;
  priceCod: number;
  isCod: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  slotId: any;
  senderId: string;
  receiverId: string;
  packageImages: any[];
}
export interface StationCreateResponse {
  message: string;
}
// & { user: UserInfo };
type StationGetRes = PaginationRes & { contends: StationPayload[] };
type PackageGetRes = PaginationRes & { contends: PackagePayload[] };
export enum StationApi {
  CreateStation = '/admin/stations',
  GetListStation = '/managers/stations',
  GetStation = '/stations',
  GetShelfs = '/shelfs',
  Packages = '/packages',
  Staffs = '/staffs',
  Racks = '/racks',
  Slots = '/slots',
  Payments = '/payments',
  Dashboards = '/dashboards',
  GetListStationByStaff = 'staffs/stations',
}

const createStation = (data: StationPayload) =>
  apiClient.post<StationCreateResponse>({ url: StationApi.CreateStation, data });

const getStation = () => apiClient.get<StationGetRes>({ url: StationApi.GetStation });
export const useListOrdersHistory = (values?: InputType) => {
  return useQuery(['listOrdersHistory', values], () =>
    apiClient.get<StationGetRes>({ url: StationApi.Payments, params: values }),
  );
};
export const useListDashboards = () => {
  return useQuery(['listDashboards'], () =>
    apiClient.get<StationGetRes>({ url: StationApi.Dashboards }),
  );
};
export const useListStationManagers = (values?: any) => {
  return useQuery(['listStationManagers', values], () =>
    apiClient.get<StationGetRes>({ url: `/managers/stations/${values}` }),
  );
};
export const useListStation = (values?: InputType) => {
  return useQuery(['listStation', values], () =>
    apiClient.get<StationGetRes>({ url: StationApi.GetListStation, params: values }),
  );
};
export const useListPackageStation = (payload?: any) => {
  return useQuery(['listPackageStation', payload], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.Packages}?${payload.stationIds}&PageSize=10`,
      params: payload.values,
    }),
  );
};
export const useListPackageHistoryStation = (payload?: any) => {
  return useQuery(['listPackageHistoryStation', payload], () =>
    apiClient.get<StationGetRes>({
      url: `/package-status-histories?${payload.stationIds}&PageSize=10`,
      params: payload.values,
    }),
  );
};
export const useListPaymentStation = (payload?: any) => {
  return useQuery(['listPaymentStation', payload], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.Payments}?${payload.stationIds}&PageSize=10`,
      params: payload.values,
    }),
  );
};
export const useGetStationByStaff = () => {
  return useQuery(['listStationStaff'], () =>
    apiClient.get<StationGetRes>({ url: StationApi.GetListStationByStaff }),
  );
};
export const useListZoneStaff = (values?: any) => {
  return useQuery(['listZone', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.Staffs}${StationApi.GetStation}`,
      // params: values,
    }),
  );
};
export const useListZone = (values?: any) => {
  return useQuery(['listZone', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/zones`,
      // params: values,
    }),
  );
};
export const useListShelf = (values: String) => {
  return useQuery(['listShelf', values], () =>
    apiClient.get<StationGetRes>({
      url: StationApi.GetShelfs,
      params: { zoneId: values },
    }),
  );
};

export const useCreateZone = (values?: any) => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};
export const useUpdateZone = (values?: any) => {
  return useMutation(
    async (payload: ZonePayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones/${payload.id}`,
        data: {
          name: payload.name,
          description: payload.description,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};
export const useDeleteZone = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/zones/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete zone sucessfully');
        queryClient.invalidateQueries(['listZone']);
      },
    },
  );
};

export const useCreateShelf = () => {
  return useMutation(
    async (payload: ShelfPayload) =>
      apiClient.post<StationCreateResponse>({
        url: StationApi.GetShelfs,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create shelf sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};

export const useDeleteShelf = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetShelfs}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete Shelf sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
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
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};

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
        queryClient.invalidateQueries(['listStation']);
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
        queryClient.invalidateQueries(['listStation']);
      },
    },
  );
};

export const useCreateCheckIn = () => {
  return useMutation(
    async (payload: CheckInPayload) =>
      apiClient.post<StationCreateResponse>({
        url: StationApi.Packages,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create check in sucessfully');
        queryClient.invalidateQueries(['listCheckIn']);
      },
    },
  );
};

export const useCreateCheckInForce = () => {
  return useMutation(
    async (payload: CheckInForcePayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/force`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create check in sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useDeletePackage = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.Packages}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete packages sucessfully');
        queryClient.invalidateQueries(['listShelf']);
        queryClient.invalidateQueries(['package']);
      },
    },
  );
};
export const useListStaffPackage = (values?: any) => {
  return useQuery(['listStaffPackage', values], () =>
    apiClient.get<StationGetRes>({
      url: `/packages?StationIds=${values.id}&PageSize=10`,
      params: values.listRelateParams,
    }),
  );
};
export const useListStationPayment = (values?: any) => {
  return useQuery(['listStationPayment', values], () =>
    apiClient.get<StationGetRes>({
      url: `/payments?StationId=${values.id}&PageSize=10`,
      params: values.listRelateParams,
    }),
  );
};
export const useListStaffUser = (values?: any) => {
  return useQuery(['listStaffUser'], () =>
    apiClient.get<StationGetRes>({
      url: `/stations/${values}/staffs`,
      // params: values,
    }),
  );
};

export const useListStaff = (values?: any) => {
  return useQuery(['listStaff', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/stations`,
      // params: values,
    }),
  );
};
export const useCreateStaff = (values?: any) => {
  return useMutation(
    async (payload: PostStaffPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};
export const useUpdateStaff = (values?: any) => {
  return useMutation(
    async (payload: PutStaffPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs/${payload.id}`,
        data: {
          email: payload.email,
          fullName: payload.fullName,
          avatarUrl: payload.avatarUrl,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};

export const useDeleteStaff = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/staffs/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete Staff sucessfully');
        queryClient.invalidateQueries(['listStaff']);
      },
    },
  );
};

export const useListPricing = (values?: any) => {
  return useQuery(['listPricing', values], () =>
    apiClient.get<StationGetRes>({
      url: `${StationApi.GetStation}/${values}/pricings`,
      // params: values,
    }),
  );
};

export const useCreatePricing = (values?: any) => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};
export const useUpdatePricing = (values?: any) => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings/${payload.id}`,
        data: {
          startTime: payload.startTime,
          endTime: payload.endTime,
          pricePerUnit: payload.pricePerUnit,
          unitDuration: payload.unitDuration,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};

export const useDeletePricing = (values?: any) => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete pricing sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};
export const useListPricingDefault = (values?: any) => {
  return useQuery(['listPricingDefault', values], () =>
    apiClient.get<StationGetRes>({
      url: `default-pricings`,
      // params: values,
    }),
  );
};

export const useCreatePricingDefault = () => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.post<StationCreateResponse>({
        url: `default-pricings`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create pricingDefault sucessfully');
        queryClient.invalidateQueries(['listPricingDefault']);
      },
    },
  );
};
export const useUpdatePricingDefault = () => {
  return useMutation(
    async (payload: PricingPayload) =>
      apiClient.put<StationCreateResponse>({
        url: `default-pricings/${payload.id}`,
        data: {
          startTime: payload.startTime,
          endTime: payload.endTime,
          pricePerUnit: payload.pricePerUnit,
          unitDuration: payload.unitDuration,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update pricingDefault sucessfully');
        queryClient.invalidateQueries(['listPricingDefault']);
      },
    },
  );
};

export const useDeletePricingDefault = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `default-pricings/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete pricingDefault sucessfully');
        queryClient.invalidateQueries(['listPricingDefault']);
      },
    },
  );
};
export const useGoPricingDefault = (values?: any) => {
  return useMutation(
    async () =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.GetStation}/${values}/pricings/default`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Update pricing default sucessfully');
        queryClient.invalidateQueries(['listPricing']);
      },
    },
  );
};
export const useGetCheckOut = (id?: string) => {
  return useQuery(['checkOut'], () =>
    apiClient.get({
      url: `${StationApi.Packages}/${id}`,
    }),
  );
};
export const useGetPackageDetail = (data?: any) => {
  return useQuery(['packageDetail'], () =>
    apiClient.get({
      url: `${StationApi.Packages}/${data}`,
      params: data.payload,
    }),
  );
};
export const useGetPackageBySlot = (data?: any) => {
  return useQuery(['package'], () =>
    apiClient.get({
      url: `${StationApi.Packages}?SlotId=${data.id}`,
      params: data.payload,
    }),
  );
};
export const useCreateCheckOutConfirm = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/${payload.id}/${payload.status}`,
      }),
    {
      onSuccess: () => {
        message.success('Confirm checkout sucessfully');
      },
    },
  );
};
export const useCreateCheckOutPaymentQR = (payload: any) => {
  return useQuery(['QRCode'], () =>
    apiClient.get({
      url: `${StationApi.Packages}/${payload}/qr-payment`,
    }),
  );
};
export const useCreateCheckOutPayment = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/${payload.id}/payment`,
        data: { totalPrice: payload.totalPrice },
      }),
    {
      onSuccess: () => {
        message.success('payment Check out sucessfully !!!');
      },
    },
  );
};
export const useCreateCheckOutCancel = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/${payload.id}/${payload.status}`,
        data: {},
      }),
    {
      onSuccess: () => {
        message.success('Check out sucessfully !!!');
      },
    },
  );
};
export const useListPackages = (values?: string) => {
  const valueCheckIn = 'Statuses=Initialized&Statuses=Paid';
  const valueCheckOut = 'Statuses=Returned&Statuses=Completed';
  return useQuery(['listPackages', values], () =>
    apiClient.get<PackageGetRes>({
      url: `${StationApi.Packages}?${
        values === 'checkIn' ? valueCheckIn : valueCheckOut
      }&PageSize=7`,
    }),
  );
};
export const useCreateRack = () => {
  return useMutation(
    async (payload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Racks}`,
        data: { shelfId: payload },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create rack sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useUpdateRack = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.Racks}/${payload.id}`,
        data: {
          name: payload.name,
          description: payload.description,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update rack sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useDeleteRack = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.Racks}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete rack sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useCreateSlot = () => {
  return useMutation(
    async (payload) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Slots}`,
        data: payload,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Create slot sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useUpdateSlot = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.put<StationCreateResponse>({
        url: `${StationApi.Slots}/${payload.id}`,
        data: {
          name: payload.name,
          description: payload.description,
          width: payload.width,
          height: payload.height,
          length: payload.length,
          isActive: payload.isActive,
        },
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('update slot sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useDeleteSlot = () => {
  return useMutation(
    async (id: string) =>
      apiClient.delete<StationCreateResponse>({
        url: `${StationApi.Slots}/${id}`,
      }),
    {
      onSuccess: () => {
        // globalSuccess();
        message.success('Delete slot sucessfully');
        queryClient.invalidateQueries(['listShelf']);
      },
    },
  );
};
export const useCreateExpire = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/expire`,
        data: {
          ids: [payload],
        },
      }),
    {
      onSuccess: () => {
        message.success('Create Expire sucessfully');
      },
    },
  );
};
export const useCreatePushNotification = () => {
  return useMutation(
    async (payload: any) =>
      apiClient.post<StationCreateResponse>({
        url: `${StationApi.Packages}/push-notication/receive`,
        data: {
          ids: [payload],
        },
      }),
    {
      onSuccess: () => {
        message.success('Create Push Notification sucessfully');
      },
    },
  );
};
