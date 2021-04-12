import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> <span className="hide-sm"></span>
          Dashboard
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/teams">Teams</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login"> Login </Link>
      </li>
    </ul>
  );
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            {" "}
            <i className="fas fa-code"></i> Rugby Match{" "}
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
