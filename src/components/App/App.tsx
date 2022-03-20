import React from 'react';

import { useAppSelector } from './../../app/hooks';
import CurrencyList from '../CurrencyList';
import CurrencyHistory from './../CurrencyHistory';

const App = () => {
  const { activePage, activeCurrency } = useAppSelector((state) => {
    return state.page;
  });
  return (
    (activePage === 'list' && <CurrencyList />) ||
    (activePage === 'detail' && <CurrencyHistory curre />)
  );
};

export default App;
