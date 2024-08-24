import Apis from "../Apis";

export const getHow = async () => {
  try {
    const response = await Apis.get("/recycling/method");
    return response.data;
  } catch (error) {
    console.error("Error processing how data:", error);
    throw error;
  }
};
