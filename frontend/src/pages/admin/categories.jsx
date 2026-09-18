import { useState, useEffect } from "react";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../../service/categorieService"


const Categories = () => {
const [categories, setCategories] = useState([]);
const [formData, setFormData] = useState({
    categoryName: "", //name of the product ex. mobile
    parentId: "", // mobile = electronic
    status: 1 //active or inactive
});

const [editingId, setEditingId] = useState(null); // edhu yedhuku naa category ya edit panuradhuku use panurom initally null

const [loading, setLoding] = useState(false);
const [error, setError] = useState("");
const [message, setMessage] = useState("");

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


// update and create in same function
const handleSubmit = async (e) => {

    e.preventDefault();
    try {
        setError("");
        setMessage("");

        if (!formData.categoryName.trim()) {
            setError("categoryName is required");
            return;
        }

        const categoryData ={
            ...formData,
            categoryName:formData.categoryName.trim().toUpperCase()
        };

        if (editingId) {

            await updateCategory(
                editingId,
                categoryData
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


//edit
const handleEdit = async (category) => {
    setEditingId(category.categoryId);

    setFormData({
        categoryName: category.categoryName,
        parentId: category.parentId || "",
        status: category.status
    });

    setError("");
    setMessage("");
}

//Cancel edit 
const handleCancele = () => {

    setEditingId(null);

    setFormData({
        categoryName: "",
        parentId: "",
        status: 1
    });
};

//delete 
const handleDelete = async (categoryId) => {

    const confirmDelete = Window.comfirm(
        "Are You Sure You Want To Delete Category ?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        await deleteCategory(categoryId);

        setMessage(
            "Category deleted successfully"
        )

        fetchCtegories();
    } catch (error) {

        setError(
            error.respons?.data.message ||
            "Failed To Delete Category"
        );
    }
};

return (


        <div className="container-fluid py-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h3 className="mb-1">
                        Categories
                    </h3>

                    <p className="text-muted mb-0">
                        Manage your product categories
                    </p>
                </div>

            </div>


            {/* MESSAGE */}

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <div className="row g-4">

                {/* CATEGORY FORM */}

                <div className="col-lg-4">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="mb-4">
                                {editingId
                                    ? "Edit Category"
                                    : "Add Category"
                                }
                            </h5>


                            <form onSubmit={handleSubmit}>

                                {/* CATEGORY NAME */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Category Name
                                    </label>

                                    <input
                                        type="text"
                                        name="categoryName"
                                        className="form-control"
                                        placeholder="Enter category name"
                                        value={
                                            formData.categoryName
                                        }
                                        onChange={handleChange}
                                    />

                                </div>


                                {/* PARENT CATEGORY */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Parent Category
                                    </label>

                                    <select
                                        name="parentId"
                                        className="form-select"
                                        value={
                                            formData.parentId
                                        }
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            No Parent
                                        </option>

                                        {categories
                                            .filter(
                                                (category) =>
                                                    category.categoryId !== editingId
                                            )
                                            .map((category) => (

                                                <option
                                                    key={
                                                        category.categoryId
                                                    }
                                                    value={
                                                        category.categoryId
                                                    }
                                                >
                                                    {
                                                        category.categoryName
                                                    }
                                                </option>

                                            ))}

                                    </select>

                                </div>


                                {/* STATUS */}

                                <div className="mb-4">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >

                                        <option value={1}>
                                            Active
                                        </option>

                                        <option value={0}>
                                            Inactive
                                        </option>

                                    </select>

                                </div>


                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {editingId
                                            ? "Update Category"
                                            : "Add Category"
                                        }
                                    </button>


                                    {editingId && (

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>

                                    )}

                                </div>

                            </form>

                        </div>

                    </div>

                </div>


                {/* CATEGORY TABLE */}

                <div className="col-lg-8">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="mb-0">
                                    Category List
                                </h5>

                                <span className="badge text-bg-light">
                                    {categories.length} Categories
                                </span>

                            </div>


                            {loading ? (

                                <div className="text-center py-5">
                                    Loading categories...
                                </div>

                            ) : categories.length === 0 ? (

                                <div className="text-center py-5 text-muted">
                                    No categories found
                                </div>

                            ) : (

                                <div className="table-responsive">

                                    <table className="table align-middle">

                                        <thead>

                                            <tr>

                                                <th>
                                                    #
                                                </th>

                                                <th>
                                                    Category
                                                </th>

                                                <th>
                                                    Parent
                                                </th>

                                                <th>
                                                    Status
                                                </th>

                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {categories.map(
                                                (category, index) => (

                                                    <tr
                                                        key={
                                                            category.categoryId
                                                        }
                                                    >

                                                        <td>
                                                            {index + 1}
                                                        </td>


                                                        <td>

                                                            <strong>
                                                                {
                                                                    category.categoryName
                                                                }
                                                            </strong>

                                                        </td>


                                                        <td>

                                                            {category.parentId
                                                                ? categories.find(
                                                                    (item) =>
                                                                        item.categoryId ===
                                                                        category.parentId
                                                                )?.categoryName ||
                                                                "-"
                                                                : "-"
                                                            }

                                                        </td>


                                                        <td>

                                                            {Number(
                                                                category.status
                                                            ) === 1 ? (

                                                                <span className="badge text-bg-success">
                                                                    Active
                                                                </span>

                                                            ) : (

                                                                <span className="badge text-bg-secondary">
                                                                    Inactive
                                                                </span>

                                                            )}

                                                        </td>


                                                        <td>

                                                            <button
                                                                className="btn btn-sm btn-outline-primary me-2"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        category
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>


                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category.categoryId
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );

};
export default Categories;