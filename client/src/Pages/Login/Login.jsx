import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession } from "../../reducers/UserReducer";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  Axios.defaults.withCredentials = true;
  const newLogin = async () => {
    if (email?.length === 0 || password?.length === 0) {
      return setLoginMessage("Please fill in all fields");
    }
    setLoginMessage("");
    const response = await Axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    }).catch((err) => {});
    if (response?.data?.error) {
      setLoginMessage(response?.data?.message);
    } else {
      dispatch(setSession(response?.data?.user));
      localStorage.setItem("id", response?.data?.user?.id);
      navigate("/");
    }
  };

  return (
    <div className="container-fluid outsideContainer">
      <div className="logInContainer">
        <h1>Inti College</h1>
        <h2>Log in to your account</h2>
        <hr />
        <p className="errorMessage" style={{ height: "10px" }}>
          {loginMessage}
        </p>
        <input
          className="logInInput"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              newLogin();
            }
          }}
          name="email"
          placeholder="Email"
        />
        <input
          className="logInInput"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              newLogin();
            }
          }}
          name="password"
          placeholder="password"
        />
        <button onClick={newLogin} className="logInButton">
          Submit
        </button>

        {/* <button onClick={() => navigate("/loginReset")} className="logInButton">
          Forgot Password?
        </button> */}
        <p>
          Don't have an account?
          <a className="signUpAnchor" href="/register">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
