import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { getKeyFromDate, getLast10Days } from './../../app/utils';
import { CurrencyData, fetchData } from './../CurrencyList/CurrencySlice';
import { setListPage } from './../App/AppSlice';

const H3 = styled.h3`
  text-align: center;
  margin: 0;
  padding: 10px;

  background-color: gainsboro;
  opacity: 0.5;
`;

const H4 = styled.h4`
  text-align: center;
  margin: 0;
  padding: 10px;

  background-color: gainsboro;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

const Row = styled.article`
  display: flex;
  font-family: cursive;
  min-height: 24px;
  justify-content: space-between;
  padding: 0 10px;
  &:hover {
    background-color: gainsboro;
    opacity: 0.6;
    cursor: pointer;
  }
`;

type Props = {
  currency: string;
};

const CurrencyHistory: React.FC<Props> = ({ currency }) => {
  const existList: String[] = useAppSelector((state) => {
    return Object.keys(state.byDays.data);
  });

  const list: { date: Date; value: number }[] = useAppSelector((state) => {
    const days: Date[] = getLast10Days();
    const result = [];
    for (let i = 0; i < days.length - 1; i++) {
      const key = getKeyFromDate(days[i]);
      if (state.byDays.data[key]) {
        const arr: CurrencyData[] = state.byDays.data[key].filter(
          (el) => el.charCode === currency
        );
        if (arr.length) {
          result.push({ date: days[i], value: arr[0].currentValue });
        } else {
          result.push({ date: days[i], value: 0 });
        }
      }
    }
    return result;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const days: Date[] = getLast10Days();
    const arr = days
      .filter(
        (el) =>
          !existList.filter((existEl) => existEl === getKeyFromDate(el)).length
      )
      .map((el) => dispatch(fetchData(el)));
    Promise.all(arr);
  }, []);

  return (
    <>
      <H3>История {currency}</H3>
      <H4>
        <button
          onClick={() => {
            dispatch(setListPage());
          }}
        >
          {' '}
          {'<<'} К списку{' '}
        </button>
      </H4>
      {list.map((el) => {
        console.log('el', el);
        return (
          <Row key={el.date.toString()}>
            <div>
              {el.date.toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div>{el.value ? el.value.toFixed(4) : '-'}</div>
          </Row>
        );
      })}
    </>
  );
};

export default CurrencyHistory;
