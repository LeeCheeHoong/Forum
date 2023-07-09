import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import profileIcon from "../../images/profile_icon.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function HeaderDropdown({ user, logout }) {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-profile">
        <Image
          class="header-dropdown-image"
          src={profileIcon}
          roundedCircle
          width={50}
          height={50}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {user ? (
          <div>
            <Dropdown.Item
              onClick={() => {
                navigate(`/profile/${user?.name}`);
              }}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </div>
        ) : (
          <Dropdown.Item
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HeaderDropdown;
