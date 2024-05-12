import React, { useState } from "react";
import { UserAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { TabTitle } from "../../../utils/tabTitlePage";

import Logo from "../../assets/logo2_cropped.png";
import GoogleIcon from "../../assets/GoogleIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import "./LoginNSignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorFirebase, setErrorFirebase] = useState("");
  const { signUp } = UserAuth();
  const navigate = useNavigate();
  TabTitle("Sima Industries | Register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorFirebase(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="backgroundImage"></div>
      <div className="containerAuthContex">
        <div className="inputContex">
          <form onSubmit={handleSubmit}>
            <div className="logoContex">
              <Link to="/">
              <img src={Logo} alt="Logo" className="logomobile" style={{width:"110px", transform:"scale(1.5)"}}/>
              </Link>
              <h1>Join and find your dream furniture at Sima Industries</h1>
            </div>

            <span>
              <hr width="86%" color="#ECE4DE" />
            </span>


            {error ? <p className="errMsg">{error}</p> : null}
            {errorFirebase ? <p className="errMsg">{errorFirebase}</p> : null}

            <h3 style={{textAlign:"center", color:"darkblue"}}>SIGNUP</h3>

            <input
              type="text"
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="LoginBtn">Sign Up</button>

            <p>
              Have an Account ? <Link to="/login"> LogIn </Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
