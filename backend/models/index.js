class Subscriber {
  constructor({ email, date }) {
    this._data = {
      email: email.trim(),
      date,
    };
  }

  getData() {
    return Object.assign({}, this._data);
  }

  setId(id) {
    this._data.id = id;
  }

  getDataForStorage() {
    const dataCopy = Object.assign({}, this._data);
    return dataCopy;
  }
}

module.exports = { Subscriber };
