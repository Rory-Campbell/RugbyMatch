import React, { Fragment } from "react";

const TeamProfileAbout = ({
  profile: {
    bio,
    user: { name },
    team: { website },
  },
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">About {name} </h2>
        <p>{bio}</p>
        <div className="line" />
      </Fragment>
    )}
    <div className="line"></div>
    <h2 className="text-primary">Contact Us</h2>
    <div className="skills">
      <div className="p-1">
        <a href={website} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe fa-2x"></i>
        </a>
      </div>
    </div>
  </div>
);

export default TeamProfileAbout;
