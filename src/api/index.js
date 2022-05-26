import axios from "axios";

const API = axios.create({
  baseURL:
    "http://baemin-admin-alb-1499343356.ap-northeast-2.elb.amazonaws.com",
  withCredentials: true,
});
const AUTH_TOKEN = localStorage.getItem("TOKEN");
API.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
export default API;
