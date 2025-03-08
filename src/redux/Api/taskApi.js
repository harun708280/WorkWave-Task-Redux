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
        getStatusTask:builder.query({
            query:(status)=>({
                url:`/tasks/statusTask?status=${status}`,
                method:'GET'
            }),
            providesTags:['Tasks']
        })
        ,
        updateTaskStatus:builder.mutation({
            query:({taskId,status})=>({
                url:`/tasks/${taskId}/status`,
                method:'PUT',
                body:{status}
            }),
            invalidatesTags:['Tasks']
        }),
        deleteTask:builder.mutation({
            query:(taskId)=>({
                url:`/tasks/${taskId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Tasks']
        })
    })
})

export const {useCreateTaskMutation,useGetAllTaskQuery,useUpdateTaskStatusMutation,useDeleteTaskMutation,useGetStatusTaskQuery}=taskApi