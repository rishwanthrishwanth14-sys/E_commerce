import { useState, useEffect } from "react";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../../service/categorieService";

const [categories, setCategories] = useState([]);
const [formData, setFormData] = useState({
    categoryName: "", //name of the product ex. mobile
    parentId: "", // mobile = electronic
    status: 1 //active or inactive
});

const [editingId, setEditingId] = useState(null); // edhu yedhuku naa category ya edit panuradhuku use panurom initally null

const [loding, setLoding] = useState(false);
const [error, setError] = useEffect("");
const [message, setMessage] = useEffect("");

//get categories

const fetchCtegories = async () => {
    try {
        setLoding(true);
        setError("");

        const response = await getCategories();

        setCategories(response.data || []);
    } catch (error) {
        setError(
            error.response?.data.message ||
            "failed to fetch categories"
        );
    } finally {
        setLoding(false)
    }
};

useEffect(() => {
    fetchCtegories
}, []);

const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({  //prev = previous dataForm
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async (e) => {

    e.preventDefault();
    try {
        setError("");
        setMessage("");

        if (!formData.categoryName.trim()) {
            setError("categoryName is required");
            return;
        }

        if (editingId) {

            await updateCategory(
                editingId,
                formData
            );

            setMessage(
                "category update successfully"
            );
        } else {
            await createCategory(formData);

            setMessage(
                "category created successfully"
            );
        }

        setFormData({
            categoryName: "",
            parentId: "",
            status: 1
        });

        setEditingId(null);

        fetchCtegories();
    } catch {
        setError(
            error.response?.data?.message ||
            "Something went wrong"
        );
    }
};