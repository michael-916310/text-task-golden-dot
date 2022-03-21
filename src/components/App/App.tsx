import React from 'react';

import { useAppSelector } from './../../app/hooks';
import CurrencyList from '../CurrencyList';
import CurrencyHistory from './../CurrencyHistory';

import styled from 'styled-components';

const Main = styled.main`
  margin: 0 auto;
  max-width: 300px;
  outline: 1px solid gainsboro;
`;

const App = () => {
  const { activePage, activeCurrency } = useAppSelector((state) => {
    return state.page;
  });
  return (
    <Main>
      {(activePage === 'list' && <CurrencyList />) ||
        (activePage === 'detail' && (
          <CurrencyHistory currency={activeCurrency} />
        ))}
    </Main>
  );
};

export default App;
