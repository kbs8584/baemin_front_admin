import API from "api";

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
    const response = await API.post("/api/v1/common/logout", {});
    // const response = await API.post("/api/v1/common/logout", {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJob3RjYWxsMjFAZ21haWwuY29tIiwic2VxX25vIjoxLCJhdXRoIjoiUk9MRV9TVVBFUkFETUlOIiwidGl0bGUiOiJTVVBFUiBBRE1JTiIsImV4cCI6MTY1MzM3NTczM30.ocdvtNe4vRCPfjf04CCi2ThbUKYFiFRRK7TsR70tLDjwBp29yV_vLLcXDY10qKqWIc6TkiJzgflZD_qcYaZudw`,
    //   },
    // });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async () => {
  const response = await API.get(
    "api/v1/user",
    {
      params: {
        cpage: 1,
        rowItem: 20,
        sortMode: 0,
        orderMode: false,
        role: 1,
      },
    }
    // "api/v1/user?cpage=1&rowItem=20&sortMode=0&orderMode=false&role=1"
  );

  return response.data;
};
