import React from "react";
import { Link } from "react-router-dom";
const TeamsItem = ({
  profile: {
    user: { _id, name },
    location,
    img,
    team: { grades, league },
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={img} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{league}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/team/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {grades.slice(0, 4).map((grade, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-football-ball" /> {grade} Grade
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsItem;
