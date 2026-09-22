import { useState, useEffect } from "react";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../../service/categorieService"

const emptyForm = {
    categoryName: "",
    metaTitle: "",
    description: "",
    parent: "",
    status: 1,
    sortOrder: 0
};

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(emptyForm);

    const [editingId, setEditingId] = useState(null); // edhu yedhuku naa category ya edit panuradhuku use panurom initally null
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

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
        const loadCategories = async () => {
            await fetchCtegories();
        };

        loadCategories();
    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({  //prev = previous dataForm
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
    };


    // update and create in same function
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.categoryName.trim()) {
            setError("Category name is required");
            return;
        }

        if (!formData.metaTitle.trim()) {
            setError("Meta title is required");
            return;
        }
        try {
            setSaving(true);
            setError("");
            setMessage("");

            const categoryData = {
                ...formData,
                categoryName:
                    formData.categoryName.trim().toUpperCase(),
                metaTitle:
                    formData.metaTitle.trim().toUpperCase(),
                parent:
                    formData.parent
                        ? Number(formData.parent)
                        : null,
                sortOrder:
                    Number(formData.sortOrder) || 0,
                status:
                    Number(formData.status)
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
                await createCategory(categoryData);

                setMessage(
                    "category created successfully"
                );
            }

            resetForm();
            setEditingId(null);

            await fetchCtegories();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    };


    //edit
    const handleEdit = async (category) => {
        setEditingId(category.categoryId);

        setFormData({
            categoryName:
                category.categoryName || "",
            metaTitle:
                category.metaTitle || "",
            description:
                category.description || "",
            parent:
                category.parent || "",
            status:
                Number(category.status),
            sortOrder:
                category.sortOrder || 0
        });

        setError("");
        setMessage("");
    }

    //Cancel edit 
    const handleCancel = () => {

        setEditingId(null);

        resetForm();
    };

    //delete 
    const handleDelete = async (categoryId) => {

        const confirmDelete = window.confirm(
            "Are You Sure You Want To Delete Category ?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            await deleteCategory(categoryId);

            setMessage(
                "Category deleted successfully"
            )
            if (editingId === categoryId) {
                resetForm();
            }

            await fetchCtegories();
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

                                <div className="mb-3">
                                    <label className="form-label">
                                        Meta Title
                                    </label>
                                    <input
                                        className="form-control"
                                        name="metaTitle"
                                        value={
                                            formData.metaTitle
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="3"
                                        value={
                                            formData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
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

                                <div className="row g-3 mb-4">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Sort Order
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="sortOrder"
                                            value={
                                                formData.sortOrder
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />
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
                                </div>


                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
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