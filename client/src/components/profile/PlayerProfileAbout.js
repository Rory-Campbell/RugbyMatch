import React, { Fragment } from "react";

const PlayerProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">About {name} </h2>
        <p>{bio}</p>
      </Fragment>
    )}
  </div>
);

export default PlayerProfileAbout;
