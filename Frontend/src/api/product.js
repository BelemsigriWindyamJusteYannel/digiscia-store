import Rating from "../Components/Rating";
import api from "./api";

export const getProducts = await api.get("products/");

export const searchProduct = async (query) => {
    const response = await api.get(`products/search/?q=${query}`);
    return response.data
}

export const getProductRate = async (id) => {
    const response = await api.get(`products/rate/${id}/`);
    return response.data;
}

export const setProductRate = async (id,rate) => {
    const response = await api.put(`comments/${id}/`,{
        rating:rate
    });
    return response.data;
}
