import { configureStore } from '@reduxjs/toolkit';

import currencyReducer from '../components/CurrencyList/currencySlice';

const store = configureStore({
  reducer: {
    byDays: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
