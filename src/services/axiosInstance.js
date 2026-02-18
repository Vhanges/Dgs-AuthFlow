import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${api}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
