import axios from "axios";

const BASE_URL = "http://localhost:3000/api_v1";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosPrivate.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== "/auth/login" &&
      originalConfig.url !== "/auth/refresh" &&
      err.response
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig.sent) {
        originalConfig.sent = true;

        try {
          const rs = await axiosPrivate.post("/auth/refresh");

          return axiosPrivate(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export { axiosPrivate };
