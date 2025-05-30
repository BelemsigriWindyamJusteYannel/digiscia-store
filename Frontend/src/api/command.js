import api from "./api";

export const setCommande = async (products) =>{
    const response = await api.post("orders/", {
        products
    })
    return response.data
}

export const getCommands = async () =>{
    const response = await api.get(`orders/`);
    return response.data
}
export const getCommandById = async (id) =>{
    const response = await api.get(`orders/${id}/`);
    return response.data
}

export const cancelCommandById = async (id) =>{
    const response = await api.delete(`orders/${id}/`)
    return response.data
}
