import axios from 'axios';
import createDataContext from './createDataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_loading_state':
      return { ...state, loading: action.payload };
    case 'login':
      return { ...state, token: action.payload };
    case 'logout':
      return { ...state, token: false };
    default:
      return state;
  }
};

const tryLocalLogin = dispatch => async () => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      await axios.post('/auth/verify-token', { token });
      dispatch({ type: 'login', payload: token });
    } catch (err) {
      dispatch({ type: 'logout' });
    }
  } else {
    dispatch({ type: 'logout' });
  }
};

const register = dispatch => async ({ email, password }) => {
  dispatch({ type: 'set_loading_state', payload: true });

  try {
    const response = await axios.post('/auth/register', { email, password });
    const { token } = response.data;

    window.localStorage.setItem('token', token);
    dispatch({ type: 'login', payload: token });
  } catch (err) {
    console.log(err.response.data);
  } finally {
    dispatch({ type: 'set_loading_state', payload: false });
  }
};

const login = dispatch => async ({ email, password }) => {
  dispatch({ type: 'set_loading_state', payload: true });

  try {
    const response = await axios.post('/auth/login', { email, password });
    const { token } = response.data;

    window.localStorage.setItem('token', token);
    dispatch({ type: 'login', payload: token });
  } catch (err) {
    console.log(err.response.data);
  } finally {
    dispatch({ type: 'set_loading_state', payload: false });
  }
};

const logout = dispatch => () => {
  window.localStorage.removeItem('token');
  dispatch({ type: 'logout' });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { register, login, tryLocalLogin, logout },
  { token: null, loading: false }
);
