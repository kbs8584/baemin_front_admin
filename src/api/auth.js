import API from "api";

export const signIn = async (data) => {
  try {
    const response = await API.post("/api/authenticate/process", data);
    console.log("login", response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const signOut = async () => {
  try {
    const response = await API.post("/api/v1/common/logout");

    console.log("logout", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersInfo = async () => {
  // const response = await API.get(
  //   "api/v1/user",
  //   {
  //     params: {
  //       cpage: 1,
  //       rowItem: 20,
  //       sortMode: 0,
  //       orderMode: false,
  //       role: 1,
  //     },
  //   }
  // );
  const response = await API.get(
    "/api/v1/user?cpage=1&rowItem=20&sortMode=0&orderMode=false&role=1"
  );
  console.log("유저조회", response);
  return response.data;
};

export const checkDuplicateId = async (CMSId) => {
  const response = await API.get("/api/v1/login/checkUserId", {
    params: {
      userId: CMSId,
    },
  });
  return response.data;
};
