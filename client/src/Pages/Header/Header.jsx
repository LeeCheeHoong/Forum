import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import HeaderDropdown from "./HeaderDropdown";
import { deleteSession, setSession } from "../../reducers/UserReducer";
import axios from "axios";

function Header() {
  Axios.defaults.withCredentials = true;
  const user = useSelector((state) => state.user?.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async (id) => {
      const response = await axios
        .get(`http://localhost:8000/api/getUser/${id}`)
        .catch((err) => {});
      if (response?.data) {
        dispatch(setSession(response.data));
      }
    };

    if (!user && localStorage.getItem("id")) {
      getUser(localStorage.getItem("id"));
    }
  }, [user]);

  const logout = async () => {
    localStorage.clear();
    await dispatch(deleteSession());
    window.location.href = "/login";
  };

  return (
    <nav class="navbar-expand-lg headerNav">
      <div className="container-fluid">
        <div class="row">
          <div class="col-2">
            <h3
              className="headerNavH3"
              onClick={() => {
                navigate("/");
              }}
            >
              Inti College
            </h3>
          </div>
          <div class="col-9"></div>
          <div class="col-1">
            <div className="container-fluid">
              <div class="row">
                <div class="col-3 col-md-5 col-sm-10">
                  <ul class="navbar-nav">
                    <div className="container">
                      <div class="row">
                        <div class="col-4">
                          <li class="nav-item headerDropdown">
                            <HeaderDropdown user={user} logout={logout} />
                          </li>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
