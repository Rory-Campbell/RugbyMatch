import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import TeamProfileTop from "./TeamProfileTop";
import TeamProfileAbout from "./TeamProfileAbout";
import { getProfileById } from "../../actions/profile";

const TeamProfile = ({ match }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/teams" className="btn btn-light">
            Back To Teams Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <TeamProfileTop profile={profile} />
            <TeamProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeamProfile;
