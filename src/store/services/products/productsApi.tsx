import { ProductsResponse } from "../../../utils/types";
import { apiSlice } from "../api/apiSlice";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query<ProductsResponse, void>({
      query: () => "/product/product/",
      providesTags: ["products"],
    }),

    addProduct: builder.mutation({
      query: (formData) => {
        console.log(formData);

        return {
          url: "/product/product/",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["products"],
    }),
  }),
});

export const { useProductsQuery, useAddProductMutation } = productsApi;
export default productsApi;
