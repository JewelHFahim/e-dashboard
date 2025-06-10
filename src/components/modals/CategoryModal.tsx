import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../store/services/categories/categoryApis";
import { useEffect } from "react";
import Label from "../form/Label";

type Category = {
  id: number;
  title: string;
  image: string | FileList | null;
  slug?: string;
  status?: string;
  updated_at?: string;
};

interface CategoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "add" | "edit";
  selectedCategory: Category;
}

type CategoryFormData = {
  title: string;
  image: FileList;
};

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, setIsOpen, mode, selectedCategory }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>();

  useEffect(() => {
    if (mode === "edit" && selectedCategory) {
      reset({
        title: selectedCategory.title || "",
      });
    } else if (mode === "add") {
      reset({
        title: "",
        image: undefined
      });
    }
  }, [mode, selectedCategory, reset]);

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const onSubmit = async (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = mode === "add"
          ? await addCategory(formData).unwrap()
          : await updateCategory({
              id: selectedCategory.id,
              data: formData,
            }).unwrap();

      if (response?.status) {
        toast.success(response.message);
        setIsOpen(false);
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err)
      toast.error("Failed to save category");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative dark:bg-gray-800 dark:text-gray-100">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add Category" : "Edit Category"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Enter category title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="px-4 py-2 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600 border disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              { isAdding || isUpdating ? "Saving..." : mode === "add" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
