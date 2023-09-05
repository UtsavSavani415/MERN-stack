import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    navigate("/signup");
    localStorage.clear();
    console.log("====================================");
    console.log("logged out");
    console.log("====================================");
  };

  return (
    <div>
      {/* <img
        src="../../public/logo.jpg"
        alt="logo"
        className="logo"
        width="50"
        height="60"
        style={{ border: 5 }}
      /> */}
      {auth ? (
        <>
          <ul className="ul">
            <img
              src="https://w7.pngwing.com/pngs/713/936/png-transparent-online-shopping-shopping-cart-logo-e-commerce-market-blue-angle-company-thumbnail.png"
              alt="logo"
              className="logo"
            />
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Products</Link>
            </li>
            <li>
              <Link to="/update">Update Products</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/logout">
                Logout ( {JSON.parse(auth).name} )
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className="ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
