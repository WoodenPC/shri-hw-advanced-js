const { asyncExecutor } = require('./lib');

const ID = 42;
const delayMS = 1000;

function getId () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ID);
        }, delayMS);
    });
}

function getDataById (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id === ID ? resolve('🍎') : reject('💥');
        }, delayMS);
    });
}

asyncExecutor(function* () {
  console.time("Time");

  const id = yield getId();
  console.log(id);
  const data = yield getDataById(id);
  console.log('Data', data);

  console.timeEnd("Time");
});