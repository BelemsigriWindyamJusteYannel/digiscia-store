import api from "./api";

export const getProducts = await api.get("products/");

export const searchProduct = async (query) => {
    const response = await api.get(`products/search/?q=${query}`);
    return response.data
}
