import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

// eslint-disable-next-line import/no-cycle
import userService, { SignInReq } from '@/api/services/userService';
import {
  ADMIN_PERMISSION,
  STAFF_LIST_PERRMISSION,
  STATION_MANAGER_LIST_PERMISSION,
} from '@/router/constant';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { JwtDecode, UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  // const { t } = useTranslation();
  const navigatge = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation(userService.signin);

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { accessToken, refreshToken } = res;
      setUserToken({ accessToken, refreshToken });
      const decodetoken = jwtDecode<JwtDecode>(accessToken as string);
      const user: UserInfo = {
        email: decodetoken.email,
        id: decodetoken.id,
        avatar: decodetoken.avartar_url,
        username: decodetoken.user_name,
        role: decodetoken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      };
      if (
        decodetoken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ].toLowerCase() === 'admin'
      ) {
        user.permissions = ADMIN_PERMISSION;
      } else if (
        decodetoken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ].toLowerCase() === 'stationmanager'
      ) {
        user.permissions = STATION_MANAGER_LIST_PERMISSION;
      } else {
        user.permissions = STAFF_LIST_PERRMISSION;
      }
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });

      notification.success({
        message: 'Login sucessfully',
        description: `Welcome back: ${data.username}`,
        duration: 3,
      });
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signIn, []);
};
