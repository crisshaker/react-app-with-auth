import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actionsWithDispatch = {};
    for (let key in actions) {
      actionsWithDispatch[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...actionsWithDispatch }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
