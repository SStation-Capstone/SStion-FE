import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/http/tanstack/react-query';

import apiClient from '../apiClient';

import { InputType, PaginationRes } from '#/api';

type NotiQueryType = Omit<InputType, 'Statuses'> & {
  Level?: string;
  Type?: string;
  To?: string;
  From?: string;
};

type NotificationType = {
  id: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
  deletedBy: string;
  deletedAt: string;
  title: string;
  content: string;
  type: string;
  level: string;
  isRead: boolean;
  readAt: string;
};

export interface AddToStationPayload {
  id: string;
  station: string;
}
export interface MangerCreateResponse {
  message: string;
}
export interface ReadAllNotiResponse {
  message: string;
}

export type NotificationListRes = PaginationRes & { contends: NotificationType[] } & {
  countUnread: number;
};
export enum Notification {
  GetNoti = '/notifications',
  ReadNoti = '/notifications/readAll',
  DeleteNoti = '/notifications',
}

export const useListNoti = (values?: NotiQueryType) => {
  return useQuery(['listNoti', values], () =>
    apiClient.get<NotificationListRes>({ url: Notification.GetNoti, params: values }),
  );
};

// export const useUpdateManager = () => {
//   return useMutation(
//     async (payload: NotificationListRes) => {
//       return apiClient.put<MangerCreateResponse>({
//         url: `${Notification.ReadNoti}/${payload.id}`,
//         data: payload,
//       });
//     },
//     {
//       onSuccess: () => {
//         // globalSuccess();
//         message.success('Update manager sucessfully');
//         queryClient.invalidateQueries(['listManager']);
//       },
//     },
//   );
// };

export const useReadAllNoti = () => {
  return useMutation(
    async () => {
      return apiClient.patch<ReadAllNotiResponse>({
        url: `${Notification.ReadNoti}`,
      });
    },
    {
      onSuccess: () => {
        // globalSuccess();
        // message.success('Delete manager sucessfully');
        queryClient.invalidateQueries(['listManager']);
      },
    },
  );
};
