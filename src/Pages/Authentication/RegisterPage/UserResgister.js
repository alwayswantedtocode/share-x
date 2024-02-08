import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { onAuthStateChanged, auth } from "../Firebase";
import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";

//USER NAMES AND PASSWORD RULES
const NAME_REGX = /^[a-zA-Z- ]{3,35}$/;
const USER_REGX = /^[a-zA-Z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,24}$/;

const EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserResgister = () => {
  const focusRef = useRef();
  const [fullname, setFullname] = useState("");
  const [validname, setValidname] = useState(false);
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

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    const testName = NAME_REGX.test(fullname);
    setValidname(testName);
  }, [fullname]);

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
    setValidEmail(TestPassword);
  }, [password]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //if button enabled with JS hack
    const v1 = NAME_REGX.test(fullname);
    const v2 = USER_REGX.test(username);
    const v3 = EMAIL_REGX.test(email);
    const v4 = PWD_REGX.test(password);

    if (v1 && v2 && v3 && v4) {
      signUpHandleSubmit(fullname, username, email, password);
      console.log("Account succesfully created");
    } else {
      alert("There is a missing field");
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
            <h1>Signup for Share X</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Full Name"
                  ref={focusRef}
                  id="fullname"
                  name="fullname"
                  required
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <span className={validname ? "valid" : "hide"}>
                  <HiCheckCircle className="checkMark" />
                </span>
                <span className={validname || !fullname ? "hide" : "invalid"}>
                  <HiXCircle className="xMark" />
                </span>
              </div>

              <div className="input-container">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  required
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
                  placeholder="email"
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
                <p
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
                  8 to 24 characters <br />
                  Must include aleast one Uppercase,
                  <br />
                  Lowercase letters,
                  <br /> Atleast a number and a special charater. <br />
                </p>
              </div>

              <button type="subnit">Register</button>
            </form>
            <div className="mobileView">
              <span>Have an acount?</span>

              <NavLink to="/login">
                <span>
                  <p>Login</p>
                </span>
              </NavLink>
            </div>
          </div>
          <div className="Right">
            <h1>Share X</h1>
            <p>
              Sign up to connect and share posts, photos, and videos from your
              friends and loved ones.
            </p>
            <span>Have an acount?</span>

            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
          </div>
        </article>
      )}
    </section>
  );
};

export default UserResgister;
