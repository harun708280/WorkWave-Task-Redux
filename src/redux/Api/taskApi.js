import { baseApi } from "./baseApi";


export const taskApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createTask:builder.mutation({
            query:(taskData)=>({
                url:'/tasks',
                method:'POST',
                body:taskData
            }),
            invalidatesTags:['Tasks']

        }),
        getAllTask:builder.query({
            query:()=>'/tasks',
            providesTags:['Tasks']
        }),
        updateTaskStatus:builder.mutation({
            query:({taskId,status})=>({
                url:`/tasks/${taskId}/status`,
                method:'PUT',
                body:{status}
            }),
            invalidatesTags:['Tasks']
        })
    })
})

export const {useCreateTaskMutation,useGetAllTaskQuery,useUpdateTaskStatusMutation}=taskApi