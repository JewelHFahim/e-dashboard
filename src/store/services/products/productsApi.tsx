import { ProductsResponse } from "../../../utils/types";
import { apiSlice } from "../api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<ProductsResponse, void>({
      query: () => "/product/product/?page=2",
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/product/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/product/product/${id}/`,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productsApi;
export default productsApi;
