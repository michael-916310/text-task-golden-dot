import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { DTODay } from '../../api/dto';
import { getTodayData } from '../../api/api';

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
  async (date: Date | undefined): Promise<DTODay> => {
    let response: Promise<DTODay>;

    if (date) {
      return getTodayData();
    } else {
      return getTodayData();
    }
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
      for (let v of Object.keys(payload.Valute)) {
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
