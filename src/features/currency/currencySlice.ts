import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import defaulCurrencies from './defaultCurrencies'

export type Currency = {
  code: string,
  name: string,
  symbol: string
}

interface State {
  selected: Currency,
  list: Currency[]
}

const initialState: State = {
  selected: defaulCurrencies[0],
  list: defaulCurrencies // In real life this should come from an admin app or service
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Currency>) => {
      state.selected = action.payload;
    }
  }
});

export const { setSelected } = currencySlice.actions;

export const selectSelected = (state: RootState) => state.currency.selected;

export default currencySlice.reducer;
