import API from "api";
import { setUser } from "store/auth";
export const signUp = async (data) => {
  try {
    const response = await API.post("/api/v1/login/signUp", data);
  } catch (error) {
    console.error(error);
  }
};
export const signIn = async (data) => {
  try {
    const response = await API.post("/api/authenticate/process", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const signOut = async () => {
  try {
    const response = await API.post("/api/v1/common/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersInfo = async () => {
  const response = await API.get("api/v1/user", {
    params: {
      cpage: 1,
      rowItem: 20,
      sortMode: 0,
      orderMode: false,
      role: 1,
    },
  });
  // const response = await API.get(
  //   "/api/v1/user?cpage=1&rowItem=20&sortMode=0&orderMode=false&role=1"
  // );
  return response.data;
};

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
export const getGalleryImage = async (category) => {
  try {
    const response = await API.get("/api/v1/image/list", {
      params: {
        mainCategory: category,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addGalleryImage = async (imageFile) => {
  try {
    const response = await API.post("/api/v1/image/save", imageFile);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteGalleryImage = async (seqNo) => {
  try {
    const response = await API.patch(`/api/v1/image/delete?seqNo=${seqNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCheckedGalleryImages = async (seqNo) => {
  try {
    const response = await API.patch(`/api/v1/image/deletes?seqNo=${seqNo}`);
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const initPassword = async (storeId, storeEmail, CMSId) => {
  try {
    await API.post(`/api/v1/email`, {
      storeId: storeId,
      receiveMailAddr: storeEmail,
      receiveName: CMSId,
    });
  } catch (error) {
    console.error(error);
  }
};
// export const checkUser = async () => {
//   try {
//     const response = await API.get(`/api/v1/user/profile`);

//     return response.data;
//   } catch (error) {
//     // signOut
//     sessionStorage.removeItem("TOKEN");
//   }
// };
