import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DTODay } from '../../api/dto';
import { loadDayData } from '../../api/api';
import { getKeyFromDate } from './../../app/utils';

type CurrencyData = {
  id: string;
  charCode: string;
  nominal: number;
  name: string;
  currentValue: number;
  previousValue: number;
};

type CurrencySlice = {
  data: Record<string, Array<CurrencyData>>;
};

const initialState: CurrencySlice = {
  data: {},
};

const fetchData = createAsyncThunk<Promise<DTODay>, Date | undefined>(
  'currency',
  async (date, thunkApi) => {
    let response: Promise<DTODay>;

    try {
      return await loadDayData(date);
    } catch (e) {
      return thunkApi.rejectWithValue({
        Date: getKeyFromDate(date || new Date()),
        PreviousDate: '',
        PreviousURL: '',
        Timestamp: '',
        Valute: {},
      });
    }
  }
);

const currencySlice = createSlice({
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
      state.data[key] = value;
    });
    builder.addCase(fetchData.rejected, (state, { payload }) => {
      state.data[payload.Date] = [];
    });
  },
});

export type { CurrencyData };
export { fetchData };
export default currencySlice.reducer;
