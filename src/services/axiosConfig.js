import axios from "axios";
import { useAuthStore } from "../store/useAuth";

const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleSuccess = (response) => response.data;

  const handleAuthError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const { logout } = useAuthStore.getState();
      logout();

      if (typeof window !== "undefined") {
        window.location.href = "/home";
      }
    }
    return Promise.reject(error);
  };

  instance.interceptors.response.use(handleSuccess, handleAuthError);

  return instance;
};

const ApiService = {
  versionedApi: createApiInstance(import.meta.env.VITE_API_BASE_URL),
  baseApi: createApiInstance(import.meta.env.VITE_API_BASE_URL_NO_VERSION),
};

export default ApiService;
