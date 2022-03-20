import { configureStore } from '@reduxjs/toolkit';

import currencyReducer from '../components/CurrencyList/CurrencySlice';
import pageReducer from '../components/App/AppSlice';

const store = configureStore({
  reducer: {
    byDays: currencyReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
