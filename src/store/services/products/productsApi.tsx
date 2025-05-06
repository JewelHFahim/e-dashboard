import { ProductsResponse } from "../../../utils/types";
import { apiSlice } from "../api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<ProductsResponse, void>({
      query: () => "/product/product/",
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/product/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useProductsQuery, useAddProductMutation } = productsApi;
export default productsApi;
