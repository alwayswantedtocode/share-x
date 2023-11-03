import { useAuthenticationContext } from "../../../ContextApi/AuthenticationContext";
import UserResgister from "../RegisterPage/UserResgister";
import "./Login.scss";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";
const UserLogin = () => {
  const { login } = useAuthenticationContext();

  const focusRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = () => {
    login();
  };

  return (
    <section className="Login-card">
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
          <form>
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
                  passwordFocus && !validPassword ? "popup-alert" : "offscreen"
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
            <button onClick={handleLogin}>Login</button>
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
    </section>
  );
};

export default UserLogin;
