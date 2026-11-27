import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "churn_auth_token"
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(
        "churn_auth_token"
      );
      localStorage.removeItem(
        "churn_user"
      );
    }

    return Promise.reject(error);
  }
);

export const isBackendAvailable = async () => {
  try {
    await api.get("/health", {
      timeout: 3000,
    });

    return true;
  } catch {
    return false;
  }
};

export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong."
) => {
  if (error?.response?.data?.detail) {
    return String(
      error.response.data.detail
    );
  }

  if (error?.response?.data?.message) {
    return String(
      error.response.data.message
    );
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
};

export const apiGet = async (
  url,
  config = {}
) => {
  const response = await api.get(
    url,
    config
  );

  return response.data;
};

export const apiPost = async (
  url,
  data = {},
  config = {}
) => {
  const response = await api.post(
    url,
    data,
    config
  );

  return response.data;
};

export const apiPut = async (
  url,
  data = {},
  config = {}
) => {
  const response = await api.put(
    url,
    data,
    config
  );

  return response.data;
};

export const apiPatch = async (
  url,
  data = {},
  config = {}
) => {
  const response = await api.patch(
    url,
    data,
    config
  );

  return response.data;
};

export const apiDelete = async (
  url,
  config = {}
) => {
  const response = await api.delete(
    url,
    config
  );

  return response.data;
};

export default api;