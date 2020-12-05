import { API_URL } from "./appRoutes";
import axios from "axios";
import { getToken } from "./index";
import { toast } from "react-toastify";

// const socketId = window.Echo && window.Echo.socketId();

const baseurl = axios.create({
  baseURL: API_URL,
  timeout: 100000,
  headers: {
    "content-Type": "application/json",
    // "X-Socket-ID" : typeof socketId !== "undefined" ? socketId : null
  },
});

baseurl.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

baseurl.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error("Unknown internal network error occured.", {
        position: "top-center",
        autoClose: false,
        toastId: "iesQAi940421",
        className: "text-only",
        closeOnClick: false,
      });
    }

    return Promise.reject(error);
  }
);

export default baseurl;
