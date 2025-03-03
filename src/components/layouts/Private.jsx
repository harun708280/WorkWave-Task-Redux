import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from '../../utils/firebaseConfig';
import { setUser } from '../../redux/features/user/userSlice';
import Loading from './Loading';
import { Navigate } from 'react-router-dom';

const Private = ({children}) => {
    const {email,isLoading}=useSelector((state)=>state.userSlice)
    const dispatch=useDispatch()
    console.log(email);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    isLoading:false
                }));
            }
        });
    
        return () => unsubscribe(); // Cleanup function
    }, [dispatch]);
    

    if (isLoading) {
        return <Loading/>
    }
    if (!isLoading && !email) {
        return <Navigate to='/'></Navigate>
    }
    return children
};

export default Private;