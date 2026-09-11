import api from "./api";

const createCategory =async(categoryData)=>{
    const response = await api.post(
        "/api/admin/category",
        categoryData  //namma anupura data vea store panuradhuku 
    );

    return response.data;
};

const getCategories = async()=>{
    const response = await api.get(
        "/api/admin/categories",
    );
    return response.data;
};

const updateCategory = async( categoryId, categoryData ) => {
    const response = await api.put(
        `/api/admin/category/${categoryId}`,
        categoryData
    )
    return response.data;
}

const deleteCategory = async(categoryId)=>{
    const response = await api.delete(
        `/api/admin/category/${categoryId}`,
        
    )
    return response.data
}

export default {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
