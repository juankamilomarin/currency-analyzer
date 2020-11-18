import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currency from '../features/currencyConverter/currencySlice';
import exchangeRate from '../features/exchangeRate/exchangeRateSlice';

export const store = configureStore({
  reducer: {
    currency: currency,
    exchangeRate: exchangeRate
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
