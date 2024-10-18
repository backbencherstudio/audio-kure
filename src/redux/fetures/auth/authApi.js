import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  
  endpoints: (builder) => ({

    // getALlUser: builder.query({
    //   query: () => {
    //     return {        
    //         url: "/auth",
    //         method: "GET"
    //     }
    //   },
    //   providesTags : ["all-users"],
    // }),

    registerUser: builder.mutation({
      query: (user) => {
        return {        
            url: "/auth/create-user",
            method: "POST",
            body: {user},
        }
      },
      invalidatesTags: ["all-users"],
    }),

    verifyOTP: builder.mutation({
      query: (verifyData) => {
        return {        
            url: "/auth/verifyOTP",
            method: "POST",
            body: verifyData,         
        }
      },
      invalidatesTags: ["all-users"],
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
