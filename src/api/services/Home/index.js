import { BASE_URL } from "../../../config/config";

// ** Function to get Upcoming Course details
const getProducts = async () => {
  const response = await fetch(`${BASE_URL}products`);
  return response.json();
};

const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}products/${id}`);
  return response.json();
};

export { getProducts, getProductById };
