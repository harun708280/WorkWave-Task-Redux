import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './features/taskSlice'
import userSlice from './features/user/userSlice'
export const store = configureStore({
  reducer: {

    allTasks:taskSlice,
    userSlice:userSlice

  },
})

export default store