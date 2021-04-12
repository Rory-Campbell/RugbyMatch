import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

export const Experience = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const experience = profile.player.experience;
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.team}</td>
      <td className="hide-sm">{exp.grade}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Playing Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th className="hide-sm">Grade</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
