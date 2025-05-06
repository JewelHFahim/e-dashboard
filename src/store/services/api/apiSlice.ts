import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "pencilApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.pencilwoodbd.org",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["products"],
});
