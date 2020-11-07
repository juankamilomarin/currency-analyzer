import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ExchangeRate = {
  originExchangeRateCode: string,
  targetExchangeRateCode: string,
  value: number
}

interface State {
  list: ExchangeRate[]
}

const initialState: State = {
  list:  []
};

export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
  }
});

export const { } = exchangeRateSlice.actions;

export const selectList = (state: RootState) => state.exchangeRate.list;

export default exchangeRateSlice.reducer;
