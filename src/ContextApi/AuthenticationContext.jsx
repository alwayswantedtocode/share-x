import React, { useContext, useState, useEffect } from "react";
import { auth, db, onAuthStateChanged } from "../Authentication/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  // SIGN-IN/REGISTER
  const collectionUserRef = collection(db, "user");

  const provider = new GoogleAuthProvider();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // SignIn WithGoogle
  const SignInWithGoogle = async () => {
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      const Query = query(collectionUserRef, where("uid", "==", user.uid));
      const docs = await getDocs(Query);
      if (docs.docs.legnth === 0) {
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          iamge: user?.photoURL,
          authProvider: popup?.providerId,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const [AuthUser, setAuthUser] = useState(null);
  const [fetchUser, setFetchuser] = useState(false);

  const userId = AuthUser?.uid;
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        SignInWithGoogle,

        user,
        setUser,
        userData,
        userId,
        AuthUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
