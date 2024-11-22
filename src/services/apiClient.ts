import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Conditionally set BASE_URL based on VITE_PROXY_URL environment variable
const BASE_URL = import.meta.env.VITE_DEPLOY_TO_ASTRIA === 'true' ? '' : '/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

// multipart form data api client2
const apiClient2: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
  },
});

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const post = async <T>(url: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

const handleApiError = (error: AxiosError): void => {
  if (error.response?.status === 401) {
    window.location.href = 'https://www.astria.ai/users/sign_in';
    return;
  }
};

export { apiClient, apiClient2 };
