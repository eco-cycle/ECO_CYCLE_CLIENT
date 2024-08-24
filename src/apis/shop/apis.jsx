import Apis from "../Apis";

export const getProduct = async () => {
  try {
    const response = await Apis.get('/product/all');
    return response.data;
  } catch (error) {
    console.error("Error processing Product All data:", error);
    throw error;
  }
};
