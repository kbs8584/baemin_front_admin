import axios from "axios";

const API = axios.create({
  baseURL:
    "http://baemin-admin-alb-1499343356.ap-northeast-2.elb.amazonaws.com",
  // withCredentials: true,
});

export default API;
