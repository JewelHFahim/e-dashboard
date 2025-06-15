import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../form/Label";
import {
  useAddProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../store/services/products/productsApi";
import toast from "react-hot-toast";
import { Product } from "../../utils/types";
import Loader from "../../utils/loader/Loader";

// type Product = {
//   id: number;
//   name: string;
//   category: number;
//   short_description: string;
//   details: string;
//   current_price: number;
//   discount_price: number;
//   product_image: { image: string }[];
// };

interface ProductModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct?: Product;
  mode: "add" | "edit";
}

type FileWithPreview = {
  file: File;
  preview: string;
};


type ProductFormData = {
  name: string;
  category: number;
  short_description: string;
  details: string;
  current_price: number;
  discount_price: number;
  product_image: [{ image: "" }];
};

const ProductModal: React.FC<ProductModalProps> = ({ showModal, setShowModal, mode, selectedProduct }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  console.log(selectedProduct);
  const id = selectedProduct?.id || 0;
  console.log(id)
  const { data: details, isLoading: isDetailsLoading } = useProductDetailsQuery({id});
  const [images, setImages] = useState<FileWithPreview[]>([]);

  console.log(details)

    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...fileList]);
  };


  useEffect(() => {
    if (mode === "edit" && selectedProduct) {
      reset({
        name: selectedProduct.name || "",
        category: selectedProduct.category || 0,
        short_description: selectedProduct.short_description || "",
        details: selectedProduct.details || "",
        current_price: selectedProduct.current_price || 0,
        discount_price: selectedProduct.discount_price || 0,
      });
      setImages(selectedProduct.product_image.map(img => ({ file: new File([], img.image), preview: img.image })));
    } else if (mode === "add") {
      reset({
        name: "",
        category: 0,
        short_description: "",
        details: "",
        current_price: 0,
        discount_price: 0,
      });
      setImages([]);
    }
  
  }, [mode, selectedProduct, reset]);

    const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };


    const onSubmit = async (data: ProductFormData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", String(data.category));
      formData.append("short_description", data.short_description);
      formData.append("details", data.details);
      formData.append("current_price", String(data.current_price));
      formData.append("discount_price", String(data.discount_price));
  
      images.forEach((img) => {
      formData.append("product_image", img.file);
    });

      if (mode === "edit" && selectedProduct) {
        formData.append("id", String(selectedProduct.id));
      }

      console.log({data, ...images})
  
      try {
        const response = mode === "add"
            ? await addProduct(formData).unwrap()
            : await updateProduct({ id: selectedProduct?.id || 0, formData }).unwrap();

            console.log(response)
  
        if (response?.status) {
          toast.success(response.message);
          setShowModal(false);
          reset();
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err)
        toast.error("Failed to save category");
      }
    };
  
    if (!showModal) return null;

  if (isDetailsLoading) {
    return <div className="w-fll min-h-[60vh] flex justify-center items-center"> <Loader/> </div> ;
  }


  return (
    <div className="absolute left-1/2 top-0  -translate-x-1/2 w-full h-full  bg-black/30 rounded-xl sm:p-5">
      <div className="sm:w-[65%] h-max mx-auto bg-white dark:bg-gray-700 dark:text-gray-300 rounded-xl p-4 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold mb-4">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </h3>

          <button onClick={() => setShowModal(!showModal)}>Close</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Product Title */}
            <div>
              <Label>
                Product Title <span className="text-error-500">*</span>
              </Label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="info@gmail.com"
                className="h-11 w-full rounded-lg border dark:border-gray-500 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.name && <span>This field is required</span>}
            </div>

            <div>
              <Label>
                Category <span className="text-error-500">*</span>
              </Label>
              <select
                {...register("category", { required: true })}
                className="h-11 w-full appearance-none rounded-lg border dark:border-gray-500 border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10"
              >
                <option hidden value="">
                  Select Category
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs">
                  Category is required
                </span>
              )}
            </div>

            {/* short_description */}
            <div>
              <Label>
                Short Description <span className="text-error-500">*</span>
              </Label>
              <input
                type="text"
                {...register("short_description", { required: true })}
                placeholder="short description"
                className="h-11 w-full rounded-lg border dark:border-gray-500 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.short_description && <span>This field is required</span>}
            </div>

            {/* description */}
            <div>
              <Label>
                Description <span className="text-error-500">*</span>
              </Label>
              <input
                type="text"
                {...register("details", { required: true })}
                placeholder="short description"
                className="h-11 w-full rounded-lg border dark:border-gray-500 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.details && <span>This field is required</span>}
            </div>

            {/* current_price */}
            <div>
              <Label>
                Current Price <span className="text-error-500">*</span>
              </Label>
              <input
                type="number"
                {...register("current_price", { required: true })}
                placeholder="current price"
                className="h-11 w-full rounded-lg border dark:border-gray-500 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.current_price && <span>This field is required</span>}
            </div>

            {/* discount_price */}
            <div>
              <Label>
                Discount Price <span className="text-error-500">*</span>
              </Label>
              <input
                type="number"
                {...register("discount_price", { required: true })}
                placeholder="discount price"
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500 dark:border-gray-500"
              />
              {errors.discount_price && <span>This field is required</span>}
            </div>

            {/* Image upload */}
            <div>
              <div>
                <Label htmlFor="image">Image</Label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="w-full border border-gray-300 dark:border-gray-500 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              {images?.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img.preview}
                    alt={`preview-${idx}`}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 h-5 w-5 right-0 bg-black text-white text-xs p-1 rounded-full opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAdding || isUpdating}
              className="px-4 py-2 text-sm rounded-md bg-gray-700 text-white hover:bg-gray-600 border disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {isAdding || isUpdating
                ? "Saving..."
                : mode === "add"
                ? "Add"
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
