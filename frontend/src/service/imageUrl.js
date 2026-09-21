const API_URL = import.meta.env.VITE_API_URL;

export const getProductImageUrl = (image) => {

    if (!image) {
        return null;
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    const cleanImage = image.replace(/^\/+/, "");

    if (cleanImage.startsWith("uploads/products/")) {
        return `${API_URL}/${cleanImage}`;
    }

    if (cleanImage.startsWith("products/")) {
        return `${API_URL}/uploads/${cleanImage}`;
    }

    return `${API_URL}/uploads/products/${cleanImage}`;
};