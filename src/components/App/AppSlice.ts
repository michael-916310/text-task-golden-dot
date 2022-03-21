import { createSlice } from '@reduxjs/toolkit';

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
    setListPage: (state) => {
      state.activePage = 'list';
      state.activeCurrency = '';
    },
  },
});

export const { setDetailPage, setListPage } = slice.actions;
export default slice.reducer;
