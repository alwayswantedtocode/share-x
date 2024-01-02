import {
  BrowserRouter as Router,
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
import ProfileInfo from "../Pages/ProfilePage/ProfileInfo";
import { AuthenticationProvider } from "../ContextApi/AuthenticationContext";
import ProtectedRoute from "../Pages/Authentication/Protected Route/ProtectedRoute";
import { useAuthenticationContext } from "../ContextApi/AuthenticationContext";

// const router = createBrowserRouter([
//   { path: , element: <Register /> },
//   { path: , element: <Login /> },
// ]);

const App = () => {
  // const { userId } = useAuthenticationContext();

  return (
    <>
      <Router>
        <AuthenticationProvider>
          <Routes>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index path="/home" element={<Home />} />
                <Route path="/profile/:id" element={<ProfileInfo />} />
              </Route>
            </Route>
          </Routes>
        </AuthenticationProvider>
      </Router>
    </>
  );
};

export default App;
