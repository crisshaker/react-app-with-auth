import { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as TodoContext } from '../context/TodoContext';

export default () => {
  const { resetState } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);

  function resetStateAndLogout() {
    console.log('logging out');

    resetState();
    logout();
  }

  return [resetStateAndLogout];
};
