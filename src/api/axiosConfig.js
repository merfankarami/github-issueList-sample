import Axios from "axios";
import { getToken } from ".";
import { storageTokenKey } from "./index";

export const BaseUrl = "https://devapi.evergame.io/api";
export const WebsocketUrl = "https://devapi.jobbfy.com";

export const apiAgent = Axios.create({ baseURL: BaseUrl });

apiAgent.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAgent.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      localStorage.remove(storageTokenKey);
    }

    return Promise.reject(error);
  }
);

export default Axios;
