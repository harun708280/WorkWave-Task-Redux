import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebaseConfig";

const initialState={
    name:'',
    email:'',
    photo:'',
    isLoading:true,
    isError:false,
    error:''
}
export const createUser=createAsyncThunk('userSlice/CreateUser',async({email,password})=>{
    const data=await createUserWithEmailAndPassword(auth,email,password)
    return {
        email:data.user,email
    }
})

const userSlice=createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setUser:(state,{payload})=>{
            state.email=payload.email
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending,(state)=>{
            state.isLoading=true,
            state.isError=false,
            state.email=''
        })
        .addCase(createUser.fulfilled,(state,{payload})=>{
            state.isLoading=false,
            state.isError=false,
            state.email=payload.email,
            state.error=''
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.email='',
            state.error=action.error.message
        })
    }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer