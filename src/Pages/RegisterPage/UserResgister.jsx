import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import Alert from "../../Components/Alert/Alert";
// import axios from "axios";
import axios from "../../API/axios";

//USER NAMES AND PASSWORD RULES
const USER_REGX = /^[a-zA-Z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,24}$/;

const EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserResgister = () => {
  const focusRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [loading, setLoading] = useState(false);
  const { signUpHandleSubmit } = useAuthenticationContext();

  const navigate = useNavigate();

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    const testUserName = USER_REGX.test(username);
    setValidUsername(testUserName);
  }, [username]);

  useEffect(() => {
    const TestEmail = EMAIL_REGX.test(email);
    setValidEmail(TestEmail);
  }, [email]);

  useEffect(() => {
    const TestPassword = PWD_REGX.test(password);
    setValidPassword(TestPassword);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with JS hack
    const v1 = USER_REGX.test(username);
    const v2 = EMAIL_REGX.test(email);
    const v3 = PWD_REGX.test(password);

    if (!v1 || !v2 || !v3) {
      showAlert(true, "danger", "Invalid Entry");
      return;
    }
    console.log(username, password, email);
    try {
      await axios.post(
        "api/usersauth/register",
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCrendentials: true,
        }
      );
      showAlert(true, "success", "Registered successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(true);
      navigate("/");
    } catch (error) {
      if (!error?.response) {
        setLoading(false);
        showAlert(true, "danger", "No Server Response");
      } else if (error.response?.status === 409) {
        showAlert(true, "danger", "Username or Email is Taken");
      } else {
        showAlert(true, "danger", "Registration Failed");
      }
    }
  };

  return (
    <section className="Register-card">
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <article className="Card">
          <div className="Left">
            <h1 className="sharexMobile">Share X</h1>
            {alert.show && (
              <Alert
                isVisible={alert}
                Message={alert.message}
                type={alert.type}
              />
            )}
            <h1>Signup for Share X</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
                  ref={focusRef}
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <span className={validUsername ? "valid" : "hide"}>
                  <HiCheckCircle className="checkMark" />
                </span>
                <span
                  className={validUsername || !username ? "hide" : "invalid"}
                >
                  <HiXCircle className="xMark" />
                </span>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className={validEmail ? "valid" : "hide"}>
                  <HiCheckCircle className="checkMark" />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
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
                <span className={validPassword ? "valid" : "hide"}>
                  <HiCheckCircle className="checkMark" />
                </span>
                <span
                  className={validPassword || !password ? "hide" : "invalid"}
                >
                  <HiXCircle className="xMark" />
                </span>
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

              <button
                type="submit"
                disabled={
                  !validUsername || !validEmail || !validPassword ? true : false
                }
              >
                Register
              </button>
            </form>
            <div className="mobileView">
              <span>Don't have an acount?</span>

              <NavLink to="/Login">
                <span>
                  <p>Login</p>
                </span>
              </NavLink>
            </div>
          </div>
          <div className="Right">
            <h1>Share X</h1>
            <p>
              Sign up to connect and share forever memories with
              friends and loved ones.
            </p>
            <span>Have an acount?</span>
            <NavLink to="/Login">
              <button>Login</button>
            </NavLink>
          </div>
        </article>
      )}
    </section>
  );
};

export default UserResgister;
