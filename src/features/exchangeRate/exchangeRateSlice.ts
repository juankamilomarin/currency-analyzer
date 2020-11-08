import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { RootState } from '../../app/store';
import { fetchAllByDate } from './exchangeRateApi';

export type ExchangeRate = {
  originExchangeRateCode: string,
  targetExchangeRateCode: string,
  value: number
}

interface ExchangeRateState {
  selectedDate: DateTime,
  list: ExchangeRate[],
  loading: boolean,
  currentRequestId: undefined | string,
  error: null | SerializedError
}

const initialState: ExchangeRateState = {
  selectedDate: DateTime.local(2020, 11, 7),
  list:  [],
  loading: false,
  currentRequestId: undefined,
  error: null
};

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRate/fetchExchangeRates',
  async (_, { getState }) => {
    const state = getState() as RootState
    const response: any = await fetchAllByDate(state.exchangeRate.selectedDate)
    return response
  }
)

export const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchExchangeRates.pending, (state, action) => {
      if (!state.loading) {
        state.loading = true
        state.currentRequestId = action.meta.requestId
      }
    })
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      const { requestId } = action.meta
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false
        state.list = action.payload
        state.currentRequestId = undefined
      }
    })
    builder.addCase(fetchExchangeRates.rejected, (state, action) => {
      const { requestId } = action.meta
      if (state.loading && state.currentRequestId === requestId) {
        state.loading = false
        state.error = action.error
        state.currentRequestId = undefined
      }
    })
  }
});

export const selectList = (state: RootState) => state.exchangeRate.list;
export const selectLoading = (state: RootState) => state.exchangeRate.loading;
export const selectSelectedDate = (state: RootState) => state.exchangeRate.selectedDate;

export default exchangeRateSlice.reducer;
