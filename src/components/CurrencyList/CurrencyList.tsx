import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { CurrencyData, fetchData } from './CurrencySlice';
import { setDetailPage } from '../App/AppSlice';
import { getKeyFromDate, getLastExistingDate } from './../../app/utils';
import ReactTooltip from 'react-tooltip';

import styled from 'styled-components';

const Heading = styled.h1`
  text-align: center;
  font-family: cursive;
  background-color: gainsboro;
  padding: 10px;
  margin: 0;
`;

const H3 = styled.h3`
  text-align: center;
  margin: 0;
  padding: 10px;

  background-color: gainsboro;
  opacity: 0.5;
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
  const [courseDate, setCourseDate] = useState<Date>(new Date());

  const list: Array<CurrencyData> = useAppSelector((state) => {
    const dt = getLastExistingDate(state.byDays.data);
    if (dt && getKeyFromDate(dt) !== getKeyFromDate(courseDate)) {
      setCourseDate(dt);
    }
    return dt ? state.byDays.data[getKeyFromDate(dt)] : [];
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <ReactTooltip />
      <Heading>Курс валют</Heading>
      <H3>на {getKeyFromDate(courseDate)}</H3>
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
    </>
  );
};

export default CurrencyList;
