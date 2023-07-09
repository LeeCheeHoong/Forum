import React, { useEffect, useState } from "react";
import profileIcon from "../../images/profile_icon.png";
import "./Profile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "react-bootstrap";

function Profile() {
  const user = useSelector((state) => state.user?.value);
  const [newPassword, setNewPassword] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newName, setNewName] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateProfile = async () => {
    setErrorMessage("");
    const updatedData = {
      id: user?.id,
      password: newPassword,
      email: newEmail,
      name: newName,
    };

    const response = await axios
      .put("http://localhost:8000/api/update-customer", updatedData)
      .catch((error) => {});

    if (response?.data?.error === false) {
      setOpenModal(true);
    } else {
      setErrorMessage(response?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      setNewEmail(user?.email);
      setNewName(user?.name);
    }
  }, [user]);
  return (
    <div class="container-xl px-4 mt-4">
      <Modal
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Updated successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your account has been updated.
            <br></br>
          </p>
        </Modal.Body>
      </Modal>
      <div class="row">
        <div class="col-xl-4">
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">
              <img
                class="img-account-profile rounded-circle mb-2"
                src={profileIcon}
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-xl-8">
          <div class="card mb-4">
            <div class="card-header">Account Details</div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label class="small mb-1" for="inputUsername">
                    Username (how your name will appear to other users on the
                    site)
                  </label>
                  <input
                    class="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                    value={newName ?? null}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    class="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(event) => {
                      setNewEmail(event.target.value);
                    }}
                    value={newEmail ?? null}
                  />
                </div>
                <div class="mb-3">
                  <label class="small mb-1" for="inputEmailAddress">
                    Password
                  </label>
                  <input
                    class="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="New Password"
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                    value={newPassword ?? null}
                  />
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={updateProfile}
                >
                  Save changes
                </button>
                <div>
                  <p style={{ color: "red", marginTop: "10px" }}>
                    {errorMessage}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
