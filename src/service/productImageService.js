import api from "./api";

const uploadProductImages = async (productId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    const response = await api.post(
        `/api/admin/product/${productId}/images`,
        formData
    );

    return response.data;
};

const uploadProductImage = async (productId, file) => {

    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(
        `/api/admin/product/${productId}/image`,
        formData
    );

    return response.data;
};

 const getProductImages = async (productId) => {

    const response = await api.get(
        `/api/admin/product/${productId}/images`
    );

    return response.data;
};

 const deleteProductImage = async (imageId) => {

    const response = await api.delete(
        `/api/admin/product-image/${imageId}`
    );

    return response.data;
};

export default{
    uploadProductImages,
    getProductImages,
    deleteProductImage,
    uploadProductImage
}       