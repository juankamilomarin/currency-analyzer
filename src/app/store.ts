import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currency from '../features/currency/currencySlice';

export const store = configureStore({
  reducer: {
    currency: currency,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
