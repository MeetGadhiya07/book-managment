import React from "react";
import "./login.scss";

const Login = () => {
  return (
    <>
      <section className="login-container">
        <div className="main padding--25">
          <p className="login-title text--center">Sign in</p>
          <form className="login-content">
            <input className="un" type="text" placeholder="Username" />
            <input className="pass" type="password" placeholder="Password" />

            <div className="flex justify-content--center">
              <button className="login-btn">Sign in</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
