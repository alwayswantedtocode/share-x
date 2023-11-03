import {
  Router,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/Authentication/LoginPage/UserLogin";
import Register from "../Pages/Authentication/RegisterPage/UserResgister";
import Home from "../Pages/HomePage/Home";
import Layout from "../Pages/SharedLayout/Layout";
import Profile from "../Pages/ProfilePage/UserProfile";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";

// const router = createBrowserRouter([
//   { path: , element: <Register /> },
//   { path: , element: <Login /> },
// ]);

const App = () => {
  const { currentUser } = useAuthenticationContext();

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }
  //   return children;
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        > */}
        <Route path="/" element={<Layout />}>
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
