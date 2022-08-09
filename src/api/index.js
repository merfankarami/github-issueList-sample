import { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiAgent } from "./axiosConfig";

export const storageTokenKey = "evergame_admin";

export const getToken = () => {
  const emp = localStorage.getItem(storageTokenKey);
  if (emp) {
    return emp;
  } else {
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(storageTokenKey);
};

export const fetcher = async (url) => {
  try {
    const resp = await get(url);
    return resp;
  } catch (error) {
    throw error;
  }
};

export async function get(path, config) {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    console.error("Get Request Failed:", error);

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await apiAgent.get(path, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export async function delete_(path, params = null, data) {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };

  try {
    const response = (await apiAgent.delete)(path, { params, data });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export async function post(path, data, config) {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };

  try {
    const response = (await apiAgent.post)(path, data, config);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export async function patch(
  path,
  data,
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
  params
) {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response || error.message);
  };

  try {
    const response = (await apiAgent.patch)(path, data, { headers, params });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

export function uploadFile(name, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sampleFile", name);
  formData.append("name", name);

  return post("/upload", formData);
}
