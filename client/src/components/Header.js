import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/AuthContext';

const Header = () => {
  const {
    state: { token },
    logout
  } = useContext(Context);

  return (
    <div className="ui small menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/protected" className="item">
        Protected
      </Link>
      <div className="right menu">
        {token ? (
          <div className="item">
            <Link to="#" className="ui red button" onClick={logout}>
              Log out
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <div className="item">
              <Link to="/login" className="ui blue button">
                Log in
              </Link>
            </div>
            <div className="item">
              <Link to="/register" className="ui blue button">
                Register
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
