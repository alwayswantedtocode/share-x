import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import axios from "axios";
import Alert from "../../Components/Alert/Alert";

const PWD_REGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,24}$/;

const USER_EMAIL_REGX =
  /^(?:[a-zA-Z][A-Za-z0-9-_]{3,23}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const UserLogin = () => {
  const { login, SignInWithGoogle, signInHandleSubmit, AuthUser, setAuthUser } =
    useAuthenticationContext();

  const focusRef = useRef();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [validEmailUsername, setValidEmailUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [loading, setLoading] = useState(false);
 
const [alert, setAlert] = useState({ show: false, message: "", type: "" });
const showAlert = (show = false, type = "", message = "") => {
  setAlert({ show, type, message });
};

  const navigate = useNavigate();
  const username = AuthUser?.Username;

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    const TestEmailUsername = USER_EMAIL_REGX.test(emailOrUsername);
    setValidEmailUsername(TestEmailUsername);
  }, [emailOrUsername]);

  useEffect(() => {
    const TestPassword = PWD_REGX.test(password);
    setValidPassword(TestPassword);
  }, [password]);


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_EMAIL_REGX.test(emailOrUsername);
    const v2 = PWD_REGX.test(password);
    if (!v1 || !v2) {
      showAlert(true, "danger", "Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/usersauth/signIn",
        {
          email: emailOrUsername,
          username: emailOrUsername,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
      console.log(response.data);
      setAuthUser(response.data);
      setEmailOrUsername("");
      setPassword("");
      // showAlert(true, "Success", AuthUser?.username);
      navigate("/home");
     
      //  setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        showAlert(true, "danger", "No Server Response");
      } else if (error.response?.status === 400) {
        showAlert(true, "danger", "Wrong email or password");
      } else {
        showAlert(true, "danger", "Login failed");
      }
    }
  };

  return (
    <section className="Login-card">
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <article className="Card">
          <div className="Left">
            {alert.show && (
              <Alert
                isVisible={alert}
                Message={alert.message}
                type={alert.type}
              />
            )}
            <h1>Share X</h1>
            <p>
              Share unforgetable moments with your family and friends. Share X
              makes those moments last forever.
            </p>
            <span>Don't have an acount?</span>

            <NavLink to="/register">
              <button>Register</button>
            </NavLink>
          </div>
          <div className="Right">
            <h1 className="sharexMobile">Share X</h1>
            <h1>Login into Share X</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Email or Username"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  required
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  ref={focusRef}
                />
                <span className={validEmailUsername ? "valid" : "hide"}>
                  <HiCheckCircle className="checkMark" />
                </span>
                <span
                  className={
                    validEmailUsername || !emailOrUsername ? "hide" : "invalid"
                  }
                >
                  <HiXCircle className="xMark" />
                </span>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={password}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={
                    passwordFocus && !validPassword
                      ? "popup-alert"
                      : "offscreen"
                  }
                  id="uidnote"
                  style={{ fontSize: 0.8 + "rem", padding: 0.3 + "rem" }}
                >
                  <BiInfoCircle
                    className="click-4-info"
                    style={{ color: "3A6EA5" }}
                  />
                  <p>
                    8 to 24 characters <br />
                    Must include aleast one Uppercase,
                    <br />
                    Lowercase letters,
                    <br /> Atleast a number and a special charater. <br />
                  </p>
                </div>
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="mobileView">
              <span>Don't have an acount?</span>

              <NavLink to="/register">
                <span>
                  <p>Register</p>
                </span>
              </NavLink>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default UserLogin;
