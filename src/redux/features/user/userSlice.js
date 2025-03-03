import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../utils/firebaseConfig";

const initialState={
    name:'',
    email:'',
    photo:'',
    isLoading:true,
    isError:false,
    error:'',
    load:false,
}
export const createUser=createAsyncThunk('userSlice/CreateUser',async({email,password,username,image})=>{
    const data=await createUserWithEmailAndPassword(auth,email,password)
    await updateProfile(auth.currentUser,{
        displayName:username,photoURL:image
    })
    return {
        email:data.user.email,
        name:data.user.displayName,
        photo:data.user.photoURL,
        
    }
})

const userSlice=createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        setUser:(state,{payload})=>{
            state.name=payload.name
            state.email=payload.email
            state.photo=payload.photo
            state.isLoading=payload.isLoading
        },
        isLogout:(state,{payload})=>{
            state.name='',
            state.email='',
            state.photo=''

        },
        toggleLoading:(state,{payload})=>{
            state.isLoading=payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending,(state)=>{
            state.isLoading=true,
            state.isError=false,
            state.load=true
        })
        .addCase(createUser.fulfilled,(state,{payload})=>{
            state.isLoading=false,
            state.isError=false,
            state.email=payload.email,
            state.name=payload.name,
            state.photo=payload.photo,
            state.error=''
            state.load=false
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.email='',
            state.error=action.error.message,
            state.load=false
        })
    }
})

export const {setUser,isLogout,toggleLoading}=userSlice.actions
export default userSlice.reducer