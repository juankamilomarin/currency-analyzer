import React, { useState } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'
import DropdownMenu from '../../../common/components/DropdownMenu'
import { useSelector } from 'react-redux';
import { Currency, selectList as selectCurrencyList } from '../currencySlice';
import CurrencyInput from '../../../common/components/CurrencyInput';
import { ExchangeRatesMap } from './ConverterContainer';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
  })
)

interface Props{
    exchangeRateMap: ExchangeRatesMap
}

const Converter = (props: Props) => {
    const { exchangeRateMap } = props
    console.log('THE MAP')
    console.log(exchangeRateMap)
    const classes = useStyles(useTheme());
    const currencies = useSelector(selectCurrencyList);
    const [origin, setOrigin] = useState<Currency>(currencies[0])
    const [target, setTarget] = useState<Currency>(currencies[0])
    const [originValue, setOriginValue] = useState(0)

    return (
        <Paper className={classes.paper}>
            <DropdownMenu 
                id="origin"
                label='Origin'
                currencies={currencies}
                selectedCurrency={origin}
                onChange={(currency) => setOrigin(currency)}
            />
            <CurrencyInput 
                id="origin"
                label='Amount'
                value={ originValue }
                currencySymbol={origin?.symbol || ''}
                onChange={(value) => setOriginValue(value)}
            />
            <DropdownMenu 
                id="target"
                label='Target'
                currencies={currencies}
                selectedCurrency={target}
                onChange={(currency) => setTarget(currency)}
            />
            <CurrencyInput 
                id="target"
                label='Amount'
                value={ exchangeRateMap[target.code][origin.code] * originValue }
                currencySymbol={target?.symbol || ''}
                disabled
            />
        </Paper>
    )
}

export default Converter