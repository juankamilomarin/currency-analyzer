import React from 'react';
import AppBar from './AppBar';
import { render } from '@testing-library/react'; // TODO Add custom testUtils

describe("AppBar", () => {

    it("should display bar title", () => {
        const { getByText } = render(<AppBar/>);
        expect(getByText("Currency Converter")).toBeInTheDocument();
    });

});