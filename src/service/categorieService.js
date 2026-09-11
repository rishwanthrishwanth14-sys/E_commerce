import api from "./api";

const createCategory =async()=>{
    const response = await api.post(
        "/api/admin/category"
    );

    return response.data;
};

const getCategories = async()=>{
    const response = await api.get(
        "/api/admin/categories",
        categoryData  //namma anupura data vea store panuradhuku 
    );
    return response.data;
};

const updateCategory = async() => {
    const response = await api.put(
        `/api/admin/category/${categoryId}`,
        categoryData
    )
    return response.data;
}

const deleteCategory = async()=>{
    const response = await api.delete(
        `/api/admin/category/${categoryId}`,
        categoryData
    )
    return response.data
}

export default {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
