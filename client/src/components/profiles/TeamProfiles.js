import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { getTeamProfiles } from "../../actions/profile";
import TeamsItem from "./TeamsItem";

export const TeamProfiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getTeamProfiles());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Teams</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse teams looking for
            players
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <TeamsItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeamProfiles;
