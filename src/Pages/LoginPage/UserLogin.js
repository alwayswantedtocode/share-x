import { useAuthenticationContext } from "../../ContextApi/AuthenticationContext";
import UserResgister from "../RegisterPage/UserResgister";
import "./Login.scss";
import { NavLink } from "react-router-dom";

const UserLogin = () => {
  const { login } = useAuthenticationContext();

  const handleLogin = () => {
    login();
  };
  return (
    <section className="Login-card">
      <article className="Card">
        <div className="Left">
          <h1>Share X</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem error
            beatae explicabo incidunt.
          </p>
          <span>Don't have an acount?</span>

          <NavLink to="/register">
            <button>Register</button>
          </NavLink>
        </div>
        <div className="Right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UserLogin;
