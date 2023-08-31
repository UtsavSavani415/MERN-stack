import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css"

const NavBar = () => {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    navigate('/signup');
    localStorage.clear();
    console.log('====================================');
    console.log("logged out");
    console.log('====================================');
  }

  return (
    <div>
      <ul className="ul">
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
          {
            auth ?
              <Link onClick={logout} to="/logout">Logout</Link>
              :
              <Link to="/signup">Signup</Link>
          }</li>
        <li>
          
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
