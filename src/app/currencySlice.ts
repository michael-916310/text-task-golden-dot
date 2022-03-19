import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { DTODay } from './../api/dto';

type CurrencyData = {
  id: string;
  charCode: string;
  nominal: number;
  name: string;
  currentValue: number;
  previousValue: number;
};

type CurrencySlice = Map<string, Array<CurrencyData>>;

const initialState: CurrencySlice = new Map();

export const currencySlice = createSlice({
  name: 'byDays',
  initialState,
  reducers: {
    setDayData: (state, action: PayloadAction<DTODay>) => {
      const key = action.payload.Date.substring(0, 10);
      const value: Array<CurrencyData> = [];
      for (let v in Object.keys(action.payload.Valute)) {
        const data = action.payload.Valute;
        value.push({
          id: data[v].ID,
          charCode: data[v].CharCode,
          nominal: data[v].Nominal,
          name: data[v].Name,
          currentValue: data[v].Value,
          previousValue: data[v].Previous,
        });
      }

      console.log(key, value);
      state.set(key, value);
    },
  },
});

export type { CurrencyData };
export const { setDayData } = currencySlice.actions;
export default currencySlice.reducer;
