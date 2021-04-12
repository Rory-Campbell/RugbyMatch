import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPlayerProfiles } from "../../actions/profile";
import PlayersItem from "./PlayersItem";

export const PlayerProfiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getPlayerProfiles());
  }, [dispatch]);

  console.log(profiles);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Players</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse players looking for
            teams
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <PlayersItem key={profile._id} profile={profile} />
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

export default PlayerProfiles;
