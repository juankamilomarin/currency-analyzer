import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { RootState } from '../../app/store';
import { fetchAllByDate } from './exchangeRateApi';

export type ExchangeRate = {
  originExchangeRateCode: string,
  targetExchangeRateCode: string,
  value: number
}

interface ExchangeRateState {
  list: ExchangeRate[],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ExchangeRateState = {
  list:  [],
  loading: 'idle'
};

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRate/fetchExchangeRates',
  async () => {
    const response: { [key:string]: any } = await fetchAllByDate(DateTime.local())
    return response.data
  }
)

export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchExchangeRates.fulfilled, (state, { payload }) => {
      state.list = payload
    })
  }
});

export const { } = exchangeRateSlice.actions;

export const selectList = (state: RootState) => state.exchangeRate.list;

export default exchangeRateSlice.reducer;
