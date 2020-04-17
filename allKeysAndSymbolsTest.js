const { allKeysAndSymbols } = require('./lib');

console.log(allKeysAndSymbols({}));
console.log(allKeysAndSymbols({ test: { a: '1', b: '2' }, c: '3', e: function() {
  console.log('test test test');
}}))