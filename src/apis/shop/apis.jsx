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


export const getSingleProduct = async () => {
  try {
    const response = await Apis.get(`/product/{productId}`);
    return response.data;
  } catch (error) {
    console.error("Error processing Product Single data:", error);
    throw error;
  }
};

export const getCartIn = async () => {
  try {
    const response = await Apis.get(`/cart`);
    return response.data;
  } catch (error) {
    console.error("Error data in Cart:", error);
    throw error;
  }
};

export const postCartIn = async (productId) => {
  try {
    const response = await Apis.post(`/cart/${productId}`); // Use productId in the API call
    return response.data;
  } catch (error) {
    console.error("Error adding product to Cart:", error);
    throw error;
  }
};

export const delCartIn = async () => {
  try {
    const response = await Apis.delete(`/cart/{productId}`);
    return response.data;
  } catch (error) {
    console.error("Error data in Cart:", error);
    throw error;
  }
};

export const plusCartIn = async () => {
  try {
    const response = await Apis.put(`/cart/plus/{productId}`);
    return response.data;
  } catch (error) {
    console.error("Error data in Cart:", error);
    throw error;
  }
};

export const minusCartIn = async () => {
  try {
    const response = await Apis.put(`/cart/minus/{productId}`);
    return response.data;
  } catch (error) {
    console.error("Error data in Cart:", error);
    throw error;
  }
};

export const postPurchase = async () => {
  try {
    const response = await Apis.post(`/purchase`);
    return response.data;
  } catch (error) {
    console.error("Error data in Cart:", error);
    throw error;
  }
};