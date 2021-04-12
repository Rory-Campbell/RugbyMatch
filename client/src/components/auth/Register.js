import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { role, name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (role === "") {
      dispatch(setAlert("Please select role", "danger"));
    } else {
      if (password !== password2) {
        dispatch(setAlert("Passwords do not match", "danger"));
      } else {
        dispatch(register({ role, name, email, password }));
      }
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => onChange(e)}
            required
          >
            <option>Please Select a Role...</option>
            <option value="Player">Player</option>
            <option value="Team">Team</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            minLength="6"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already Have an account? <Link to="/login"> Sign In </Link>
      </p>
    </Fragment>
  );
};

export default Register;
