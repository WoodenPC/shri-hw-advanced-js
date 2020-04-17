class MySet {
  [Symbol.toStringTag] = 'MySet'
  constructor(arr) {
    this.data = [];
    this.size = 0;
    if (!arr) {
      return;
    }

    arr.forEach((value) => {
      this.add(value);
    })
  }

  add(value) {
    if (!this.has(value)) {
      this.data.push(value);
      this.size++;
    }
  }

  delete(value) {
    const idx = this.data.findIndex((elem) => elem === value);
    if (idx === -1) {
      return;
    }
    this.data.splice(idx, 1);
    this.size--;
  }

  has(value) {
    return this.data.includes(value);
  }

  forEach(callback, binder = null) {
    if (binder === null) {
      this.data.forEach(callback);
    } else {
      this.data.forEach(callback.bind(binder));
    }
  }

  [Symbol.iterator]() {
    const {size} = this;
    const values = this.data;
    return {
      current: 0,
      last: size - 1,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: values[this.current++] }
        } else {
          return { done: true }
        }
      }
    }
  }

  keys() {
    return this.data;
  }

  values() {
    return this.data;
  }

  entries() {
    return this.data.map((value) => [value, value]);
  }

  clear() {
    this.size = 0;
    this.data = [];
  }

  valueOf() {
    return this;
  }

  toPrimitive() {
    return this.data;
  }

  toString() {
    return '[object MySet]';
  }

}

const date = new Date()

module.exports = MySet;