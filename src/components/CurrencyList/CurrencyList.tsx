import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { CurrencyData, fetchData } from './CurrencySlice';
import { setDetailPage } from '../App/AppSlice';
import { getKeyFromDate, getLastExistingDate } from './../../app/utils';
import ReactTooltip from 'react-tooltip';

import styled from 'styled-components';

const Main = styled.main`
  margin: 0 auto;
  max-width: 300px;
  outline: 1px solid gainsboro;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: cursive;
  background-color: gainsboro;
  padding: 10px;
  margin: 0;
`;
const Row = styled.article`
  display: flex;
  font-family: cursive;
  min-height: 24px;
  justify-content: space-around;
  &:hover {
    background-color: gainsboro;
    opacity: 0.6;
    cursor: pointer;
  }
`;

const CodeColumn = styled.div`
  &:hover {
    transform: scale(1.1);
  }
`;

const ValueColumn = styled.div`
  &:hover {
    transform: scale(1.1);
  }
`;

const PercentColumn = styled.div`
  &:hover {
    transform: scale(1.1);
  }
`;

const CurrencyList = () => {
  const list: Array<CurrencyData> = useAppSelector((state) => {
    const dt = getLastExistingDate(state.byDays.data);
    return dt ? state.byDays.data[getKeyFromDate(dt)] : [];
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Main>
      <ReactTooltip />
      <Heading>currency list</Heading>
      {list.map((el) => (
        <Row
          key={el.id}
          onClick={() => {
            dispatch(setDetailPage(el.charCode));
          }}
        >
          <CodeColumn data-tip={el.name}>{el.charCode}</CodeColumn>
          <ValueColumn>{el.currentValue.toFixed(4)}</ValueColumn>
          <PercentColumn data-tip={`Курс на вчера:${el.previousValue}`}>
            {(
              ((el.currentValue - el.previousValue) / el.currentValue) *
              100
            ).toFixed(2)}{' '}
            %
          </PercentColumn>
        </Row>
      ))}
    </Main>
  );
};

export default CurrencyList;
