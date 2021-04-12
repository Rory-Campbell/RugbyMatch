import React from "react";
import { Link } from "react-router-dom";
import Upload from "../profile-forms/Upload";
import { useSelector } from "react-redux";

export const DashboardActions = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="dash-buttons">
      {user.role === "Player" ? (
        <div>
          <Link to={`/player/${user._id}`} className="btn btn-primary">
            View Profile
          </Link>
          <Link to="/teams" className="btn btn-primary my-1">
            Find a Team
          </Link>{" "}
          <br></br>{" "}
        </div>
      ) : (
        <div>
          <Link to={`/team/${user._id}`} className="btn btn-primary">
            View Profile
          </Link>
          <Link to="/players" className="btn btn-primary my-1">
            Find Players
          </Link>
          <br></br>
        </div>
      )}
      <Link to="/edit-profile" className="btn">
        <i className="fas fa-user-circle text-primary"></i>
        Edit Profile
      </Link>
      {user.role === "Player" ? (
        <Link to="/add-experience" className="btn">
          <i className="fab fa-black-tie text-primary"></i>
          Add Playing Experience
        </Link>
      ) : (
        ""
      )}

      <Upload />
    </div>
  );
};

export default DashboardActions;
