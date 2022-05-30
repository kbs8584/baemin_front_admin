import API from "api";
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
