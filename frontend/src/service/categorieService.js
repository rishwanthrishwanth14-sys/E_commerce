import api from "./api";

export const createCategory =async(categoryData)=>{
    const response = await api.post(
        "/api/admin/create/category",
        categoryData  //namma anupura data vea store panuradhuku 
    );

    return response.data;
};

export const getCategories = async()=>{
    const response = await api.get(
        "/api/admin/categories",
    );
    return response.data;
};

export const updateCategory = async( categoryId, categoryData ) => {
    const response = await api.put(
        `/api/admin/category/${categoryId}`,
        categoryData
    )
    return response.data;
}

export const deleteCategory = async(categoryId)=>{
    const response = await api.delete(
        `/api/admin/category/${categoryId}`,
        
    )
    return response.data
};
