import Label from "../form/Label";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { useAddProductMutation } from "../../store/services/products/productsApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FileInput from "../form/input/FileInput";
import { Toaster } from "react-hot-toast";

type ProductFormData = {
  name: string;
  short_description: string;
  details: string;
  current_price: number;
  discount_price: number;
  category: string;
  product_image: string[];
};

type FileWithPreview = {
  file: File;
  preview: string;
};

interface AddProductProps {
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = ({ addModal, setAddModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...fileList]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };
  const notify = () => toast.success("Here is your toast.");

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("short_description", data.short_description);
    formData.append("details", data.details);
    formData.append("current_price", String(data.current_price));
    formData.append("discount_price", String(data.discount_price));
    formData.append("category", data.category);

    images.forEach((img) => {
      formData.append("product_image", img.file);
    });

    try {
      const res = await addProduct(formData).unwrap();
      toast.success("Hellow");

      console.log(res);
      console.log(res?.message);
      console.log(res?.status);

      if (res?.status) {
        notify();
        setAddModal(false);
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  if (isLoading) {
    return <div>Adding Poroduct ...</div>;
  }

  return (
    <div className="absolute left-1/2 top-0  -translate-x-1/2 w-full h-full  bg-black/30 rounded-xl sm:p-5">
      <Toaster />
      <div className="sm:w-[65%] h-max mx-auto bg-white rounded-xl p-4 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Add Product
          </h3>

          <button onClick={() => setAddModal(!addModal)}>Close</button>
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.name && <span>This field is required</span>}
            </div>

            <div>
              <Label>
                Product Title <span className="text-error-500">*</span>
              </Label>
              <select
                {...register("category", { required: true })}
                className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10"
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
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
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-gray-500"
              />
              {errors.discount_price && <span>This field is required</span>}
            </div>

            {/* Image upload */}
            <div>
              <Label>Upload file</Label>
              <FileInput onChange={handleFileChange} className="custom-class" />
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

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
