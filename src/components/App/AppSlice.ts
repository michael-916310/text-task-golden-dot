import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type CurrentPage = {
  activePage: 'list' | 'detail';
  activeCurrency: string;
};

const initialState: CurrentPage = {
  activePage: 'list',
  activeCurrency: '',
};

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setDetailPage: (state, { payload }) => {
      state.activePage = 'detail';
      state.activeCurrency = payload;
    },
  },
});

export const { setDetailPage } = slice.actions;
export default slice.reducer;
