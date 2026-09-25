import api from "./api";

export const getMyOrder = async()=>{
    const respons = await api.get("/api/my/orders");
    return respons.data;
}