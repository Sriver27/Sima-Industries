import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import { TabTitle } from "../../../utils/tabTitlePage";

import Logo from "../../assets/logo2_cropped.png";
import GoogleIcon from "../../assets/GoogleIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import "./LoginNSignUp.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorFirebase, setErrorFirebase] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();
  TabTitle("Sima Industries | Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email === "") {
        setError("Email Invalid");
      } else if (password === "") {
        setError("Password Invalid");
      } else {
        await logIn(email, password);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrorFirebase(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="backgroundImage"></div>
      <div className="containerAuthContex">
        <div className="inputContex" >
          <form onSubmit={handleSubmit}>
            <div className="logoContex">
              <Link to="/">
              <img src={Logo} alt="Logo" className="logomobile" style={{width:"110px", transform:"scale(1.5)"}}/>
              </Link>
              <h1>Welcome Back to Sima Industries</h1>
            </div>

            <span>
              <hr width="86%" color="#ECE4DE" />
            </span>

            {error ? <p className="errMsg">{error}</p> : null}
            {errorFirebase ? <p className="errMsg">{errorFirebase}</p> : null}

            <h3 style={{textAlign:"center", color:"darkblue"}}>LOGIN</h3>
          
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="LoginBtn" >Log In</button>

            <p >
              Don't Have an Account ? <Link to="/signup"> Register </Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
