import React from "react";

const TeamProfileTop = ({
  profile: {
    location,
    img,
    team: { league, grades, coach },
    user: { name },
  },
}) => {
  return (
    <div class="profile-top bg-primary p-2">
      {img ? <img className="round-img my-1" src={img} alt={name} /> : ""}

      <h1 class="large">{name}</h1>
      <p class="lead">{location}</p>
      <p>
        <strong>League: </strong>
        {league}
      </p>
      <p>
        <strong>Grades: </strong>
        {grades.map((grade, index) => (
          <span key={index}>{grade} </span>
        ))}
      </p>
      <p>
        <strong>Head Coach: </strong>
        {coach}
      </p>
    </div>
  );
};

export default TeamProfileTop;
