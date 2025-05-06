import { useState } from "react";
import FileInput from "../form/input/FileInput";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import Select from "../form/Select";
import toast from "./../../../node_modules/react-hot-toast/src/index";
import { useAddProductMutation } from "../../store/services/products/productsApi";

type ProductFormData = {
  name: string;
  description: string;
  currentPrice: number;
  discountPrice: number;
  category: string;
  imageUrls: string[];
};

interface AddProductProps {
  addModal: boolean;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = ({ addModal, setAddModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const fileUrl = URL.createObjectURL(files[i]);
      urls.push(fileUrl);
    }
    setImageUrls(urls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !currentPrice ||
      !discountPrice ||
      !category ||
      imageUrls.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload: ProductFormData = {
      name,
      description,
      currentPrice: parseFloat(currentPrice),
      discountPrice: parseFloat(discountPrice),
      category,
      imageUrls,
    };

    console.log("✅ Submitted Payload:", payload);
    const res = addProduct(payload);
    console.log("Response:", res);
    toast.success("Product submitted successfully!");
  };

  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setCategory(value);
  };

  if (isLoading) {
    return <div>Adding Poroduct ...</div>;
  }

  return (
    <div className="absolute left-1/2 top-0 md:top-20 -translate-x-1/2 w-full h-full  bg-black/30 rounded-xl sm:p-5">
      <div className="sm:w-[65%] h-max mx-auto bg-white rounded-xl p-4 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Add Product
          </h3>

          <button onClick={() => setAddModal(!addModal)}>Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Mens Premium Track Trouser - Green"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Categoryt</Label>
              <Select
                options={options}
                placeholder="Select Option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>

            <div>
              <Label htmlFor="currentPrice">Current Price</Label>
              <Input
                id="currentPrice"
                type="number"
                placeholder="1200"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="discountPrice">Discount Price</Label>
              <Input
                id="discountPrice"
                type="number"
                placeholder="1020"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Short Description</Label>
            <TextArea
              value={description}
              onChange={(val) => setDescription(val)}
              rows={2}
            />
          </div>

          <div>
            <Label>Details</Label>
            <TextArea
              value={description}
              onChange={(val) => setDescription(val)}
              rows={4}
            />
          </div>

          <div>
            <Label>Upload Images</Label>
            <FileInput onChange={handleFileChange} className="custom-class" />
            {imageUrls.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {imageUrls.map((url, idx) => (
                  <li key={idx}>{url}</li>
                ))}
              </ul>
            )}
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
