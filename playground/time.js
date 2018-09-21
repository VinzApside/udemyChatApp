// let date = new Date();

// console.log(date.getMonth());

const moment = require('moment');

let date = moment();

console.log(date.format('mm MMM YY')); //permet de voir le mois  sous forme text abrégé (3m=3lettres) et année actuel

console.log(date.format('Do MMM, YYYY'));

let dateModif = moment();
dateModif.add(1, 'year').subtract(9, 'month');
console.log(dateModif.format('Do MMM YYYY'));


//10:35 am format en 6:01 am

let dateTest = moment();

dateTest.subtract(4, 'hours').subtract(34, 'minutes')
console.log(dateTest.format('h:mm a'));

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
