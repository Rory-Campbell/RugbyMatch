import React from "react";

const PlayerProfileTop = ({
  profile: {
    location,
    img,
    player: { position, weight, height },
    user: { name },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      {img ? <img className="round-img my-1" src={img} alt={name} /> : ""}
      <h1 className="large">{name}</h1>
      <p className="lead">{location}</p>
      <p>{position}</p>
      <p>
        <strong>Weight:</strong>
        {weight}
      </p>
      <p>
        <strong>Height:</strong>
        {height}
      </p>
    </div>
  );
};

export default PlayerProfileTop;
