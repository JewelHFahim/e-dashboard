import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "pencilApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.pencilwoodbd.org",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const token = Cookies.get("pencil_DB_Token");
      if(token){
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["products", "categories"],
});
