import api from "./api";

export const getMyProfile = async()=>{
    const response = await api.get("api/user/profile");
    return response.data;
};

export const updateMyProfile = async (profileData) => {
    const response = await api.put("/api/user/profile", profileData);
    return response.data;
};