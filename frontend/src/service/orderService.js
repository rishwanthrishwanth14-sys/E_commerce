import api from "./api";

export const getMyOrder = async()=>{
    const respons = await api.get("/api/my/order");
    return respons.data;
}