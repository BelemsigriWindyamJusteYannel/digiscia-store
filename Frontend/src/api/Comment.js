import api from "./api";

export const getComment = await api.get("comments/");

export const searchComment = async (id) => {
    const response = await api.get(`comments/${id}/`);
    return response.data;
}

export const postComment = async (comment) => {
    console.log(comment)
    const response = await api.post(`comments/`,comment);
    return response.data;
}