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

const H1 = styled.h1`
  text-align: center;
  font-family: cursive;
  background-color: gainsboro;
  padding: 10px;
  margin: 0;
`;

const App = () => {
  const { activePage, activeCurrency } = useAppSelector((state) => {
    return state.page;
  });
  return (
    <Main>
      <H1>Курс валют</H1>
      {(activePage === 'list' && <CurrencyList />) ||
        (activePage === 'detail' && (
          <CurrencyHistory currency={activeCurrency} />
        ))}
    </Main>
  );
};

export default App;
