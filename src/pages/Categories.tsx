import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "../store/services/categories/categoryApis";
import Badge from "../components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";
import CategoryModal from "../components/modals/CategoryModal";
import Loader from "../utils/loader/Loader";

type Category = {
  id: number;
  title: string;
  image: string | FileList | null;
  slug?: string;
  status?: string;
  updated_at?: string;
};

const Categories = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<string>("add");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    title: "",
    image: null,
  });

  const { data: categories, isLoading } = useCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (isLoading) {
    return <div className="w-fll min-h-[60vh] flex justify-center items-center"> <Loader/> </div> ;
  }

  const handleDelete = async (id: number) => {
    const confirmDelte = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelte) return;

    try {
      await deleteCategory(id);
      toast.success("Product delted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete this product");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 relative">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Categories List
          </h3>
        </div>

        <button
          onClick={() => {
            setShowModal(!showModal);
            setEditMode("add");
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <MdFormatListBulletedAdd className="text-xl" />
          Add Category
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Categories
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Slug
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Last Modified
              </TableCell>

              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {categories?.data?.map((category) => (
              <TableRow key={category.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={category?.image}
                        className="h-[50px] w-[50px]"
                        alt={category?.title}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {category?.title}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {category?.slug}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm"> {category?.status} </Badge>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {category?.updated_at?.split("T")[0]}
                </TableCell>

                <TableCell className="py-3  flex items-center gap-3 text-lg text-gray-500 text- theme-sm dark:text-gray-400">
                  <button
                    onClick={() => {
                      setEditMode("edit");
                      setSelectedCategory(category);
                      setShowModal(true);
                    }}
                  >
                    <FaRegEdit />
                  </button>

                  <button onClick={() => handleDelete(category.id)}>
                    <GoTrash />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <CategoryModal
          isOpen={showModal}
          setIsOpen={setShowModal}
          mode={editMode === "add" ? "add" : "edit"}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default Categories;
