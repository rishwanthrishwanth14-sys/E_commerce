import api from "./api";

export const uploadProductImages = async (productId, files) => {

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    const response = await api.post(
        `/api/admin/product/${productId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const uploadProductImage = async (productId, file) => {

    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(
        `/api/admin/product/${productId}/image`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const getProductImages = async (productId) => {

    const response = await api.get(
        `/api/admin/product/${productId}/images`
    );

    return response.data;
};

export const deleteProductImage = async (imageId) => {

    const response = await api.delete(
        `/api/admin/product-image/${imageId}`
    );

    return response.data;
};

    