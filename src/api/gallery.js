import API from "api";

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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
