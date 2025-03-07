import { baseApi } from "./baseApi";


export const userApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(userData)=>({
                url:'/users',
                method:'POST',
                body:userData
            }),
            invalidatesTags:["Users"]
        }),
        getUserByEmail:builder.query({
            query:(email)=>`/users/${email}`,
            providesTags:["Users"]
        }),
        getAllUser:builder.query({
            query:()=>'/users',
            providesTags:["Users"]
        }),
       
    })
})

export const {useRegisterUserMutation,useGetUserByEmailQuery,useGetAllUserQuery}=userApi