import React from "react";
import formatDate from "../../utils/formatDate";

const ProfileExperience = ({
  experience: { team, grade, current, to, from, location },
}) => (
  <div>
    <h3 className="text-dark">{team}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : "Now"}
    </p>
    <p>
      <strong>Grade: </strong> {grade}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
  </div>
);

export default ProfileExperience;
