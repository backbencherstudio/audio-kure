import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({

    getSingleUser: builder.query({
      query: (email) => {
        return {        
            url: `/auth?email=${email}`,
            method: "GET",
        }
      },
    }),

    registerUser: builder.mutation({
      query: (user) => {
        return {        
            url: "/auth/create-user",
            method: "POST",
            body: {user},
        }
      },
    }),

    verifyOTP: builder.mutation({
      query: (verifyData) => {
        return {        
            url: "/auth/verifyOTP",
            method: "POST",
            body: verifyData,         
        }
      },
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    purchasePlan: builder.mutation({
      query: (purchasePlan) => {                    
        return {
          url: "/auth/purchasePlan",
          method: "PATCH",
          body: {purchasePlan},
        }
      },
    }),


  }),
});

export default authApi;
