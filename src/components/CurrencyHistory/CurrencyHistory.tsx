import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { getKeyFromDate, getLast10Days } from './../../app/utils';
import { CurrencyData, fetchData } from './../CurrencyList/CurrencySlice';

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
    <div>
      {list.map((el) => {
        console.log('el', el);
        return (
          <div key={el.date.toString()}>
            <div>
              {el.date.toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div>{el.value ? el.value.toFixed(4) : '-'}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyHistory;
