import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";

const Category = ({ setFormData, setOpenCategoryDropdown, required }) => {
  const {
    categories,
    handleSetCategories,
    handleCreateCategory,
    handleDeleteCategory,
  } = useCategory();
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    handleSetCategories();
  }, []);
  return (
    <div className="p-2 border border-gray-100 rounded-3xl bg-white max-h-50 overflow-auto">
      <dir className="flex items-center justify-between text-sm my-1 px-2">
        <input
          type="text"
          value={newCategory}
          required={required}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="p-1 rounded-lg bg-gray-200 w-full"
          onClick={(e) => e.stopPropagation()}
        />
        <p
          onClick={() => {
            if (newCategory.trim().length > 0) {
              handleCreateCategory({ name: newCategory.trim() });
              setNewCategory("");
            }
          }}
          className="bg-black text-white px-2 py-1 rounded-lg ml-2 cursor-pointer"
        >
          Add
        </p>
      </dir>

      {categories.map((category) => (
        <div
          key={category._id}
          className="flex items-center justify-between px-2"
        >
          <p
            className="cursor-pointer rounded-xl hover:bg-gray-200 p-2 rounded w-[80%]"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                category: { _id: category._id, name: category.name },
              }));
              setOpenCategoryDropdown(false);
            }}
          >
            {category.name}
          </p>
          <p
            onClick={() => {
              handleDeleteCategory(category._id);
              setFormData((prev) => ({
                ...prev,
                category: { _id: "", name: "" },
              }));
            }}
            className="bg-black text-white hover:bg-gray-200 hover:text-black px-2 py-1 rounded-lg cursor-pointer text-sm"
          >
            Del
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
