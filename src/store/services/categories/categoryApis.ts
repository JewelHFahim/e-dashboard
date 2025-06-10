import { CategoriesResponse } from "../../../utils/types";
import { apiSlice } from "../api/apiSlice";

const categoryApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    categories: builder.query<CategoriesResponse, void>({
      query: () => "/product/category/",
      providesTags: ["categories"],
    }),

    categoryDetails: builder.query({
      query: ({id}) => `/product/category/${id}`,
      providesTags: ["categories"],
    }),

    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/product/category/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({data, id}) => ({
        url: `/product/category/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/product/category/${id}/`,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCategoryDetailsQuery
} = categoryApis;
export default categoryApis;
