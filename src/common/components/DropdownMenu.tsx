import React, { ChangeEvent } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { FormControl, InputLabel } from '@material-ui/core';
import { Currency } from '../../features/currencyConverter/currencySlice';

const useStyles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 240,
    }
  })
)

interface Props { 
    id: string,
    label: string,
    currencies: Currency[],
    selectedCurrency: Currency,
    onChange: (option: Currency) => void,
}

const DropdownMenu = (props: Props) => {
    const classes = useStyles(useTheme());
    const { id, label, currencies, selectedCurrency, onChange } = props

    const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        let selectedCurrency = currencies.find((currency) => { return currency.code === event.target.value }) as Currency
        onChange(selectedCurrency)
    }

    return (
    <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id={`label-dropdown-menu-${id}`}>{label}</InputLabel>
        <Select
            labelId={`label-dropdown-menu-${id}`}
            id={`dropdown-menu-${id}`}
            value={selectedCurrency === null ? '' : selectedCurrency.code}
            onChange={handleChange}
            label={label}
        >
            {currencies.map((currency) =>
                <MenuItem value={currency.code} key={currency.code}>
                    {currency.name}
                </MenuItem>
            )}
        </Select>
    </FormControl>
    )
  }

export default DropdownMenu
