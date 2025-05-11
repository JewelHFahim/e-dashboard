import { apiSlice } from "../api/apiSlice";

export const authAPis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/admin-login/",
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register/",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/auth/user-profile/",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
} = authAPis;
