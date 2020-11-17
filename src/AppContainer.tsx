import App from './App'
import { useDispatch } from "react-redux";
import { fetchExchangeRates } from "./features/exchangeRate/exchangeRateSlice";
import React, { useEffect } from "react";

const AppContainer = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        // Pre-load exchange rates
        dispatch(fetchExchangeRates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return <App/>
}

export default AppContainer