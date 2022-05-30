import API from "api";

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
  } catch (error) {
    console.error(error);
  }
};
