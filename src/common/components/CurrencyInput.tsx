import React, { ChangeEvent } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';

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
    value: number,
    currencySymbol: string,
    disabled?: boolean,
    onChange?: (value: number) => void
}

// TODO Fix number format when user types 0 and allow enter decimal values
const CurrencyInput = (props: Props) => {
    const classes = useStyles(useTheme());
    const { id, label, value, currencySymbol, disabled, onChange } = props
    const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        const parsedValue = parseFloat(event.target.value as string)
        if(onChange) onChange(isNaN(parsedValue) ? 0 : parsedValue)
    }

    return (
        <FormControl variant='outlined' className={classes.formControl}>  
          <InputLabel htmlFor={`currency-input-${id}`}>{label}</InputLabel>
          <OutlinedInput
            id={`currency-input-${id}`}
            value={value}
            startAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
            labelWidth={60}
            onChange={handleChange}
            disabled={disabled}
          />
        </FormControl>
    )
  }

export default CurrencyInput