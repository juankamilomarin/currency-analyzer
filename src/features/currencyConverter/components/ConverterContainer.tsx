import { createSelector, ThunkDispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { RootState } from '../../../app/store'
import { ExchangeRate, selectList as selectExchangeRateList } from '../../exchangeRate/exchangeRateSlice'
import { Currency, selectList as selectCurrencyList } from '../currencySlice'
import Converter from './Converter'

export type ExchangeRatesMap = { [key: string]: { [key: string]: number } }

const selectExchangeRatesAsMap = (currencyList: Currency[], exchangeRateList: ExchangeRate[]) => {
  let exchangeRatesMap: ExchangeRatesMap = {}
  console.log('THE LIST')
  console.log(exchangeRateList)
  currencyList.forEach(currency => { exchangeRatesMap[currency.code] = {} })
  for (let i = 0; i < Object.keys(exchangeRatesMap).length; i++) {
        const targetCurrency = Object.keys(exchangeRatesMap)[i];
        console.log(targetCurrency)
        exchangeRateList.forEach(exchangeRate => {
            console.log(exchangeRate)
            if(exchangeRate.target === targetCurrency){
                exchangeRatesMap[targetCurrency][exchangeRate.origin] = exchangeRate.rate
            }
        })
  }
  return exchangeRatesMap
}

const getMemoizedExchangeRateMap = createSelector(
    [selectCurrencyList, selectExchangeRateList],
    selectExchangeRatesAsMap
)


const mapStateToProps = (state: RootState) => {
    return {
        exchangeRateMap: getMemoizedExchangeRateMap(state)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, any>) => {   
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Converter)