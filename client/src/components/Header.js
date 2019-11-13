import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/AuthContext';
import useResetStateAndLogout from '../hooks/useResetStateAndLogout';

const Header = () => {
  const {
    state: { token }
  } = useContext(Context);

  const [resetStateAndLogout] = useResetStateAndLogout();

  return (
    <div className="ui small menu">
      <Link to="/" className="item">
        Home
      </Link>
      {token && (
        <Link to="/todos" className="item">
          Todos
        </Link>
      )}
      <div className="right menu">
        {token ? (
          <React.Fragment>
            <div className="item">
              <Link
                to="#"
                className="ui red button"
                onClick={resetStateAndLogout}
              >
                Log out
              </Link>
            </div>
          </React.Fragment>
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
