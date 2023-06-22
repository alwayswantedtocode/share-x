import "./Register.scss";
import { NavLink } from "react-router-dom";

const UserResgister = () => {
  return (
    <section className="Register-card">
      <article className="Card">
        <div className="Left">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
        <div className="Right">
          <h1>Share X</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem error
            beatae explicabo incidunt.
          </p>
          <span>Have an acount?</span>

          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </div>
      </article>
    </section>
  );
};

export default UserResgister;
