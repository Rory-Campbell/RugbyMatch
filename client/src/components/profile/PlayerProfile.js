import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import PlayerProfileTop from "./PlayerProfileTop";
import PlayerProfileAbout from "./PlayerProfileAbout";
import ProfileExperience from "./ProfileExperience";
import { getPlayerProfileById } from "../../actions/profile";

const PlayerProfile = ({ match }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getPlayerProfileById(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.user.role === "Team" ? (
            <Link to="/players" className="btn btn-light">
              Back To Players Profiles
            </Link>
          ) : (
            ""
          )}

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <PlayerProfileTop profile={profile} />
            <PlayerProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.player.experience.length > 0 ? (
                <Fragment>
                  {profile.player.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PlayerProfile;
