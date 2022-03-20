import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
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

type CurrencySlice = {
  status: 'fulfilled' | 'rejected' | 'notInitialized';
  data: Record<string, Array<CurrencyData>>;
};

const initialState: CurrencySlice = {
  status: 'notInitialized',
  data: {},
};

const fetchData = createAsyncThunk(
  'currency',
  async (date: Date): Promise<DTODay> => {
    const url = `https://www.cbr-xml-daily.ru/archive/${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}/daily_json.js`;

    const resp = await fetch(url);
    const result = await resp.json();

    console.log('url', url);
    console.log('result', result);

    return JSON.parse(result);
  }
);

export const currencySlice = createSlice({
  name: 'byDays',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      const key = payload.Date.substring(0, 10);
      const value: Array<CurrencyData> = [];
      for (let v in Object.keys(payload.Valute)) {
        const data = payload.Valute;
        value.push({
          id: data[v].ID,
          charCode: data[v].CharCode,
          nominal: data[v].Nominal,
          name: data[v].Name,
          currentValue: data[v].Value,
          previousValue: data[v].Previous,
        });
      }
      state.status = 'fulfilled';
      state.data[key] = value;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export type { CurrencyData };
export { fetchData };
export default currencySlice.reducer;
