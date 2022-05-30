import axios from "axios";

const API = axios.create({
  baseURL:
    "http://baemin-admin-alb-1499343356.ap-northeast-2.elb.amazonaws.com",
  // withCredentials: true,
  // headers: { Authorization: `Bearer ${token}` },
});

API.interceptors.request.use(
  (config) => {
    if (!config.url.endsWith("/")) {
      config.url = `${config.url}/`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authInterceptor = {};

API.setAuthInterceptor = (token, signOut) => {
  authInterceptor.req = API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });

  authInterceptor.res = API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        signOut();
      }

      return Promise.reject(error);
    }
  );
};

API.clearAuthInterceptors = () => {
  API.interceptors.request.eject(authInterceptor.req);
  API.interceptors.response.eject(authInterceptor.res);
};

export default API;
