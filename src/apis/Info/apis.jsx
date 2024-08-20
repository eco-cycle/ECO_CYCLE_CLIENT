import Apis from "../Apis";

export const getInfo = async () => {
  try {
    const response = await Apis.get("/api/v1/member/info");
    return response.data.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching info:", error);
    return null; // 오류 발생 시 null 반환
  }
};

export const updateInfo = async (location) => {
  const req = {
    location: location
  };

  try {
    const response = await Apis.put("/api/v1/member/location", req);
    console.log(response);
  } catch (error) {
    console.error("Error updating info:", error);
  }
};

export const updateProfile = async (nickname, imageUrl) => {
  const formData = new FormData();
  formData.append("nickname", nickname);
  if (imageUrl) {
    formData.append("image", imageUrl);
  }

  try {
    const response = await Apis.put("/api/v1/member/info", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};