import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const newRegister = async () => {
    setRegisterStatus("");
    if (
      newName.length === 0 ||
      newEmail.length === 0 ||
      newPassword.length === 0
    ) {
      setRegisterStatus("Please fill in all the fields.");
      return;
    } else if (!validateEmail(newEmail)) {
      setRegisterStatus("Incorrect email format.");
      return;
    } else if (newPassword.length <= 5) {
      setRegisterStatus("Password is too short.");
      return;
    }

    const response = await axios
      .post(`http://localhost:8000/api/register`, {
        name: newName,
        email: newEmail,
        password: newPassword,
      })
      .catch((error) => {});

    if (!response?.data?.error) {
      setOpenModal(true);
    } else {
      setRegisterStatus(response?.data?.message);
    }
  };

  const validateEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <div className="container-fluid outsideContainer">
      <Modal
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            navigate("/login");
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Successfully registered!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your account has been created.
            <br></br>
          </p>
        </Modal.Body>
      </Modal>
      <div className="logInContainer">
        <h1>Register</h1>
        <hr />
        <p className="errorMessage" style={{ height: "10px" }}>
          {registerStatus ?? ""}
        </p>
        <form>
          <input
            className="logInInput"
            type="text"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                newRegister();
              }
            }}
            name="username"
            placeholder="Username"
          />
          <input
            className="logInInput"
            type="email"
            id="email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                newRegister();
              }
            }}
            name="email"
            placeholder="Email"
          />
          <input
            className="logInInput"
            type="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                newRegister();
              }
            }}
            name="password"
            placeholder="Password"
          />
        </form>
        <button onClick={newRegister} type="submit" className="logInButton">
          Submit
        </button>
        <p>
          Already have an account?
          <a className="signUpAnchor" href="/login">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
