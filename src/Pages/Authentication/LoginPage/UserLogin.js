import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import "./Login.scss";
import { NavLink,useNavigate } from "react-router-dom";
import { useState, useRef,useEffect } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
import { onAuthStateChanged,auth } from "../Firebase";


const PWD_REGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,24}$/;

const EMAIL_REGX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserLogin = () => {
  const { login, SignInWithGoogle, signInHandleSubmit } =
    useAuthenticationContext();

  const focusRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



 useEffect(() => {
   focusRef.current.focus();
 }, []);


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
        navigate("/login");
      }
    });
  }, [navigate]);

   const handleSubmit = (e) => {
     e.preventDefault();
     const v1 = EMAIL_REGX.test(email);
     const v2 = PWD_REGX.test(password);
     if (v1 && v2) {
           signInHandleSubmit(email, password);
         console.log("Signed in Successfully");
     } else {
       alert("Invid Username/Email/Password");
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
                  placeholder="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="off"
                  aria-describedby="uidnote"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={focusRef}
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
