import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const auth = useSelector((state) => state.auth);

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Rugby Match</h1>
            <p className="lead">
              Build your Rugby Resume and find a team. Or Register your team to
              connect with the best Rugby talent.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                {" "}
                Sign Up{" "}
              </Link>
              <Link to="/login" className="btn">
                {" "}
                Login{" "}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
