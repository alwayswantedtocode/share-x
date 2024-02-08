import React, { useContext, useState, useEffect } from "react";
import { auth, db, onAuthStateChanged } from "../Pages/Authentication/Firebase";
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

  // SignIn WithEmailandPassword handler
  const signInHandleSubmit = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const signUpHandleSubmit = async (fullname, username, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await addDoc(collectionUserRef, {
        uid: user.uid,
        fullname,
        username,
        providerId: "email/password",
        email: user.email,
      });

      await updateProfile(user, { displayName: username });
    } catch (error) {
      console.error(error, "regestration failed");
      alert(error.message);
    }
  };

  // const handleRestPassword = async(email)=>{
  //   try {
  //     await sendPasswordResetEmail(auth,email)
  //   } catch (error) {
  //      console.error(error);
  //      alert(error.message)
  //   }
  // }

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUserRef, where("uid", "==", user?.uid));
        await onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data());
        });
        setUser(user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    userStateChanged();
    if (user || userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
    return () => userStateChanged();
  }, []);

  console.log("user", user);

  const SignOutUser = async () => {
    await signOut(auth);
    console.log("signed out");
  };

  const userId = user?.uid;
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        SignInWithGoogle,
        signInHandleSubmit,
        signUpHandleSubmit,
        SignOutUser,
        user,
        setUser,
        userData,
        userId,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  return useContext(AuthenticationContext);
};
