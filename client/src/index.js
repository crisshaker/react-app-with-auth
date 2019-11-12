import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Provider } from './context/AuthContext';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.querySelector('#root')
);
