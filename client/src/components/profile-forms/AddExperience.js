import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addExperience } from "../../actions/profile";

export const AddExperience = () => {
  const [formData, setFormData] = useState({
    team: "",
    grade: "",
    location: "",
    from: "",
    to: "",
    current: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { team, grade, location, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any playing experience you have
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addExperience(formData, history));
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* Team"
            name="team"
            value={team}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Grade"
            name="grade"
            value={grade}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Team
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;
