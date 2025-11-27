import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [forgetEmail,setForgetEmail] = useState('');
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth,email);
    }

    const changeProfile = (user, profile) => {
        return updateProfile(user, profile);
    }

    useEffect(() => {
        // set the observer
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        //    console.log('current user auth state change', currentUser);
           setUser(currentUser);
           setLoading(false);
        })
        // clear the observer on unmount
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        // createUser: createUser
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        forgetPassword,
        changeProfile,
        forgetEmail,
        setForgetEmail,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;