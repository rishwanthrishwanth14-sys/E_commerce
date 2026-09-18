import api from "./api";

export const updateMyProfle = async(profileData)=>{
    const response =await api.put("api/customer/profile/",profileData)
    return response.data;
}

export const getMyProfile = async ()=>{
    const response = await api.get("api/customer/profile");
    return response.data;
};

