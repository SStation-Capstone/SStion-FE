import { createBrowserHistory } from '@remix-run/router';
import { message as Message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// eslint-disable-next-line import/no-cycle
import { useUserStore } from '@/store/userStore';
// import { t } from '@/locales/i18n';
import { getItem, removeItem } from '@/utils/storage';

import { Result } from '#/api';
import { UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

// 创建 axios 实例
const history = createBrowserHistory();

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API as string,
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求被发送之前做些什么
    const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
    }
    return config;
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error);
  },
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    if (!res.data) throw new Error('The interface request failed, please try again later!');

    const { data, message } = res.data;
    // 业务请求成功
    const hasSuccess = res.data && Reflect.has(res, 'status');

    if (hasSuccess) {
      return res.data;
    }

    // 业务请求错误
    throw new Error(message || 'The interface request failed, please try again later!');
  },
  async (error: AxiosError<Result>) => {
    let errMsg = '';
    const { response, message } = error || {};
    if (error.response?.status === 401) {
      Message.error('Token Expire! Redirect to Login Page');
      setTimeout(() => {
        removeItem(StorageEnum.Token);
        window.location.hash = '#/login';
        window.location.reload();
      }, 1000);
      return Promise.reject(error);
    }
    try {
      errMsg = response?.data?.message || message;
      Message.error(errMsg);
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    return Promise.reject(error);
  },
);

const refreshTokenApi = async () => {
  // 获取 refreshToken
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { refreshToken: token } = useUserStore.getState().userToken;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // 调用 API
  const apiClient = new APIClient();
  const res = await apiClient.post<UserToken>({
    url: 'auth/refresh',
    data: { refreshToken: token },
  });
  if (res) {
    // 更新 token 信息
    useUserStore.getState().actions.setUserToken({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
  }
  return res;
};
class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}
export default new APIClient();
