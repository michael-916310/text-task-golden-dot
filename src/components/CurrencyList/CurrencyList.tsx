import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../app/hooks';
import { CurrencyData } from './../../app/currencySlice';

const CurrencyList = () => {
  const list: Array<CurrencyData> =
    useAppSelector((state) => {
      const d = new Date();
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (state.byDays[key]) {
        return state.byDays[key];
      }
    }) || [];

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return <div>CurrencyList</div>;
};

export default CurrencyList;
