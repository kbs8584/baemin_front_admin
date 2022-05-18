import API from "api";

export const signIn = async (data) => {
  try {
    const response = await API.post("/authenticate/process", {
      data,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
