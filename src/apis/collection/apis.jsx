import Apis from "../Apis";

export const getImageProcessingFunc = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Apis.post(
      "/api/v1/image-processing/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
