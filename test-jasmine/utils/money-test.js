import { formatCurrency } from "../../scripts/utils/money.js";

//to create the suite we have the keyword describe

describe('Test Suite: Format currency', () => {
    it('Converts the cents into the dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('works with the zero', () => {
            expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounds up the number with the nearest cents', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('Rounds up with the nearest cents', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
});