function allKeysAndSymbols (object) {
  const result = [];
  if (!object) {
    return result;
  }

  result.push(...Object.getOwnPropertyNames(object));
  let proto = Object.getPrototypeOf(object);
  while(proto) {
    result.push(...Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
  }
  return result;
}

function createProxyIn(object) {
  return new Proxy(object, {
    has(target, prop) {
      const props = Object.getOwnPropertyNames(target);
      const symbols = Object.getOwnPropertySymbols(target);
      return props.includes(prop) || symbols.includes(prop);
    }
  })
}

function asyncExecutor(generator) {
  const it = generator();
  let next = it.next();
  let curPromise = null;
  let interval = setInterval(() => {
    if (next.done) {
      clearInterval(interval);
      return;
    }

    if (next.value instanceof Promise) {
      if (curPromise === null) {
        curPromise = next.value;
        curPromise.then((value) => {
          next = it.next(value);
          curPromise = null;
        }).catch((msg) => {
          console.log(msg);
          clearInterval(interval);
        })
      }
    } else {
      next = it.next(next.value);
    }

  }, 20);

}

module.exports = {
  allKeysAndSymbols,
  createProxyIn,
  asyncExecutor
};