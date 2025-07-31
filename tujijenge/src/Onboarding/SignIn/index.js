import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../sharedComponents/Button";
import Input from "../../sharedComponents/Input";
import { useLogin } from "../../hooks/useLogin";
import "./style.css";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, error, loading } = useLogin();
  const location = useLocation();
  const roleParam = (new URLSearchParams(location.search).get("role") || "").toLocaleLowerCase();
  const role = capitalize(roleParam);

  const validate = () => {
    let err = {};
    if (!email) err.email = "Please enter your email";
    if (!password) err.password = "Please enter your password";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await login(email, password, roleParam);
  };

  return (
    <div className="welcome-wrapper">
      <div className="left-panel">
        <div className="logo">
          <img src="/assets/logo.png" alt="Tuijenge Logo" className="logostackedSt" />
        </div>
        <h1 className="welcomeSt">Sign In as {role || "User"}</h1>
        <img src="/assets/logohorizontal.png" alt="Tuijenge Logo" className="logo-horizontal" />
        {error && <p className="invalid">{error}</p>}
        <form className="form-container" onSubmit={handleSignIn} noValidate>
          <div className="input inputemail">
            <Input
              id="email"
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
          </div>
          <div className="input inputpass">
            <Input
              id="password"
              label="Password: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="error-message">{errors.password}</p>}
          </div>
          <div className="signinButton">
            <Button label="login" variant="primary" disabled={loading} type="submit" />
          </div>
        </form>
      </div>
      <div className="right-panel">
        <img src="/assets/spinach.png" alt="Spinach" className="right-image" />
      </div>
    </div>
  );
}

export default SignIn;
