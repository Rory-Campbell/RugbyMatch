import React from "react";
import { Link } from "react-router-dom";
const PlayersItem = ({
  profile: {
    user: { _id, name },
    location,
    img,
    player: { position, playsfor, height, weight },
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={img} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {position} {playsfor && <span> at {playsfor}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/player/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        <li className="text-primary">Weight: {weight} kg</li>
        <li className="text-primary">Height: {height} cm</li>
      </ul>
    </div>
  );
};

export default PlayersItem;
