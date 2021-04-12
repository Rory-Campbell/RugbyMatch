import React, { useState, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    location: "",
    bio: "",
    img: "",

    grades: "",
    league: "",
    coach: "",
    website: "",
    players: "",

    position: "",
    height: "",
    weight: "",
    playsfor: "",
  });

  useEffect(() => {
    dispatch(getCurrentProfile());

    setFormData({
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      grades: loading || !profile.team ? "" : profile.team.grades.join(","),
      league: loading || !profile.team ? "" : profile.team.league,
      coach: loading || !profile.team ? "" : profile.team.coach,
      website: loading || !profile.team ? "" : profile.team.website,

      position: loading || !profile.player ? "" : profile.player.position,
      height: loading || !profile.player ? "" : profile.player.height,
      weight: loading || !profile.player ? "" : profile.player.weight,
      playsfor: loading || !profile.player ? "" : profile.player.playsfor,
    });
  }, [dispatch, loading]);

  const {
    location,
    bio,
    grades,
    league,
    coach,
    website,
    position,
    height,
    weight,
    playsfor,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history, true));
  };
  const playerForm = (
    <div>
      <h1 className="large text-primary">Edit Your Player Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Let's get some information for your profile
      </p>
      <small>* = required fields</small>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select
            name="position"
            value={position}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Preferred Position</option>
            <option value="Prop">Prop</option>
            <option value="Hooker">Hooker</option>
            <option value="Second Row">Second Row</option>
            <option value="Flanker">Flanker</option>
            <option value="Scrum Half">Scrum Half</option>
            <option value="Fly Half">Fly Half</option>
            <option value="Center">Center</option>
            <option value="Wing">Wing</option>
            <option value="Fullback">Fullback</option>
          </select>
          <small className="form-text">
            Give us an idea of where you prefer to play
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Team"
            name="playsfor"
            value={playsfor}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Your current or most recent team</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & Country suggested (eg. London, England)
          </small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="0 cm"
            name="height"
            value={height}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Height in cm</small>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="0 KG"
            name="weight"
            value={weight}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Weight in KG</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );

  const teamForm = (
    <div>
      <h1 className="large text-primary">Edit Your Team's Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Let's get some information for team's Profile
      </p>
      <small>* = required fields</small>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Head Coach"
            name="coach"
            value={coach}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Coach Name</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="League"
            name="league"
            value={league}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            What league does your team play in?
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Grades"
            name="grades"
            value={grades}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. 1st,2nd,3rd,4th)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Team's website</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of your team"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );

  return user && user.role === "Player" ? (
    <Fragment>{playerForm}</Fragment>
  ) : (
    <Fragment>{teamForm}</Fragment>
  );
};

export default EditProfile;
