import { Product, ProductsResponse } from "../../../utils/types";
import { apiSlice } from "../api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    products: builder.query<ProductsResponse, void>({
      query: () => "/product/product/?page=2",
      providesTags: ["products"],
    }),

    productDetails: builder.query<Product, {id: number}>({
      query: ({id}) => `/product/product/${id}/`,
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

    updateProduct: builder.mutation<Product, { formData: FormData; id: number }>({
      query: ({formData, id}) => ({
        url: `/product/product/${id}/`,
        method: "PATCH",
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
  useProductDetailsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productsApi;
export default productsApi;
