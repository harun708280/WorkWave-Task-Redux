import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './features/taskSlice'
import userSlice from './features/user/userSlice'
import { baseApi } from './Api/baseApi'
export const store = configureStore({
  reducer: {

    allTasks:taskSlice,
    userSlice:userSlice,
    [baseApi.reducerPath]:baseApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});


export default store