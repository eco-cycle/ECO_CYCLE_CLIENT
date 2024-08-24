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

export const getAllRecycleMyItem = async () => {
  try {
    const response = await Apis.get("/api/v1/recycle/sale");
    return response.data;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

export const createRecycle = async (file, type, price) => {
  // FormData 객체 생성
  const formData = new FormData();


  formData.append("image", file);
  formData.append(
    "recycleRequestDto",
    new Blob(
      [
        JSON.stringify({
          type: type,
          price: price,
        }),
      ],
      { type: "application/json" }
    )
  );
   
  try {
    // axios POST 요청
    const response = await Apis.post("/api/v1/recycle/create", formData);

    return response.data;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error;
  }
};