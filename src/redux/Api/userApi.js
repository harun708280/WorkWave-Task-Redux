import { baseApi } from "./baseApi";


export const userApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(userData)=>({
                url:'/users',
                method:'POST',
                body:userData
            })
        })
    })
})

export const {useRegisterUserMutation}=userApi