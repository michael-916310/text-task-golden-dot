import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './app/store';

import CurrencyList from './components/CurrencyList/CurrencyList';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyList />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
