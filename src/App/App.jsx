import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/LoginPage/UserLogin";
import Register from "../Pages/RegisterPage/UserResgister";
import Home from "../Pages/Home Page/Home";
import Layout from "../Pages/Shared Layout/Layout";
import ProfilePage from "../Pages/Profile Page/ProfilePage";
import { AuthenticationProvider } from "../ContextApi/AuthenticationContext";
import ProtectedRoute from "../Protected Route/ProtectedRoute";



const App = () => {

  return (
    <>
      <Router>
        <AuthenticationProvider>
          <Routes>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index path="/" element={<Home />} />
                <Route
                  path="/profilepage/:username"
                  element={<ProfilePage />}
                />
              </Route>
            </Route>
          </Routes>
        </AuthenticationProvider>
      </Router>
    </>
  );
};

export default App;
