import API from "api";
import axios from "axios";

const TOKEN = "TOKEN";
const TOKEN_KEY = sessionStorage.getItem(TOKEN);

export const checkDuplicateId = async (CMSId) => {
  try {
    const response = await API.get("/api/v1/login/checkUserId", {
      params: {
        userId: CMSId,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const initPassword = async (storeId, storeEmail, CMSId) => {
  try {
    const res = await API.post(`/api/v1/email`, {
      storeId: storeId,
      receiveMailAddr: storeEmail,
      receiveName: CMSId,
    });
    if (res.code === 0) alert("비밀번호 초기화 이메일이 발송되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

export const getStoreList = async (page, input, mode) => {
  try {
    const response = await API.get("/api/v1/user/search", {
      params: {
        cpage: page,
        rowItem: 10,
        sortMode: 1,
        searchInput: input,
        searchMode: mode,
        orderMode: false,
      },
      headers: { Authorization: `Bearer ${TOKEN_KEY}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getStoreIdAndEmail = async (storeId) => {
  try {
    const response = await API.get("/api/v1/robot/store", {
      params: { storeId: storeId },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 400) return;
    console.error(error);
  }
};
export const changeToken = async (data) => {
  try {
    const response = await API.post("/api/v1/user/change/token", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
