import {
  Router,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/LoginPage/UserLogin";
import Register from "../Pages/RegisterPage/UserResgister";
import Home from "../Pages/HomePage/Home";
import Layout from "../Pages/SharedLayout/Layout";
import Profile from "../Pages/ProfilePage/UserProfile"



// const router = createBrowserRouter([
//   { path: , element: <Register /> },
//   { path: , element: <Login /> },
// ]);

 
const App = () => {

   const currentUser =true;

  const ProtectedRoute = ({children})=>{
    if (!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
    </Route>
  )
);
 
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      {/* <Login /> */}
      {/* <Register /> */}
    </>
  );
};

export default App;
