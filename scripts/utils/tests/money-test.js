import { formatCurrency } from "../money.js";

console.log('testSuite:Format currency')
//this is the basic test case
console.log('converts the cents into the dollars')
if(formatCurrency(2095) === '20.95'){
    console.log('passed')
} else {
    console.log('failed');
}


//these two are the edge cases
console.log('works with zero')
if(formatCurrency(0) === '0.00'){
    console.log('passed')
} else {
    console.log('failed');
}

console.log('Rounds up to the nearest cents')
if(formatCurrency(2000.5) === '20.05'){
    console.log('passed')
} else {
    console.log('failed');
}

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed')
} else {
    console.log('failed');
}