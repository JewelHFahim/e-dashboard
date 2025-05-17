import {
  useDeleteProductMutation,
  useProductsQuery,
} from "../store/services/products/productsApi";
import Badge from "../components/ui/badge/Badge";
import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useState } from "react";
import AddProduct from "../components/modals/AddProduct";
import toast from "react-hot-toast";

export default function Products() {
  const { data: products, isLoading } = useProductsQuery();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      toast.success("Product delted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete this product");
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="overflow-hidde n rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6 relative">
     
      

      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Product List
          </h3>
        </div>

        <button
          onClick={() => setAddModal(!addModal)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
        >
          <MdFormatListBulletedAdd className="text-xl" />
          Add Product
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
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
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
                Date
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
            {products?.data?.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product?.product_image[0]?.image}
                        className="h-[50px] w-[50px]"
                        alt="{product.name}"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product?.stock}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product?.discount_price}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product?.current_price}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm"> Pending </Badge>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product?.created_at?.split("T")[0]}
                </TableCell>

                <TableCell className="py-3  flex items-center gap-3 text-lg text-gray-500 text- theme-sm dark:text-gray-400">
                  <button>
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
                    <GoTrash />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {addModal && <AddProduct addModal={addModal} setAddModal={setAddModal} />}
    </div>
  );
}
