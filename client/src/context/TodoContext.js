import serverAPI from '../apis/server';
import createDataContext from './createDataContext';
import history from '../history';

const INITIAL_STATE = { todos: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset_state':
      return INITIAL_STATE;
    case 'set_loading_state':
      return { ...state, loading: action.payload };
    case 'fetch_todos':
      return {
        ...state,
        todos: action.payload.map(todo => ({ ...todo, loading: false }))
      };
    case 'set_todo_loading_state':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.payload._id) {
            return { ...todo, loading: action.payload.state };
          }
          return todo;
        })
      };
    case 'delete_todo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload._id)
      };
    default:
      return state;
  }
};

const resetState = dispatch => () => {
  dispatch({ type: 'reset_state' });
};

const fetchTodos = dispatch => async () => {
  console.log('fetching todos');

  const response = await serverAPI.get('/todos');

  dispatch({ type: 'fetch_todos', payload: response.data });
};

const createTodo = dispatch => async ({ title }) => {
  console.log('creating todo');

  dispatch({ type: 'set_loading_state', payload: true });

  try {
    await serverAPI.post('/todos', { title });
    history.push('/todos');
  } catch (err) {
  } finally {
    dispatch({ type: 'set_loading_state', payload: false });
  }
};

const editTodo = dispatch => async ({ _id, title }) => {
  console.log('editing todo');

  dispatch({ type: 'set_loading_state', payload: true });

  try {
    await serverAPI.patch(`/todos/${_id}`, { title });
    history.push('/todos');
  } catch (err) {
  } finally {
    dispatch({ type: 'set_loading_state', payload: false });
  }
};

const deleteTodo = dispatch => async _id => {
  dispatch({ type: 'set_todo_loading_state', payload: { _id, state: true } });

  try {
    await serverAPI.delete(`/todos/${_id}`);

    dispatch({ type: 'delete_todo', payload: { _id } });
  } catch (err) {
    dispatch({
      type: 'set_todo_loading_state',
      payload: { _id, state: false }
    });
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { resetState, fetchTodos, createTodo, editTodo, deleteTodo },
  INITIAL_STATE
);
