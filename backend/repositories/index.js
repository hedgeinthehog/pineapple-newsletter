const { Subscriber } = require('../models');
const DbStorage = require('../storage');

class SubscribersRepository {
  constructor() {
    this._storage = new DbStorage('subscribers');
    this.generateDataToReturn = subscriber => {
      const subscriberModel = new Subscriber({
        email: subscriber.email,
        date: subscriber.reg_date,
      });
      subscriberModel.setId(subscriber.id_subscribers);
      const data = subscriberModel.getData();
      return data;
    };
  }

  async getAll() {
    try {
      const subscribers = await this._storage.getAll();
      return subscribers.map(subscriber => {
        return this.generateDataToReturn(subscriber);
      });
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async getById(id) {
    try {
      const subscriber = await this._storage.getById(id);
      if (!subscriber) return null;

      return this.generateDataToReturn(subscriber);
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async create({ email }) {
    try {
      const subscriberModel = new Subscriber({
        email,
      });
      const dataToStore = subscriberModel.getDataForStorage();

      const { id_subscribers } = await this._storage.create(dataToStore);
      subscriberModel.setId(id_subscribers);
      const data = subscriberModel.getData();
      return data;
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }

  async remove(id) {
    try {
      await this._storage.remove(id);
    } catch (e) {
      throw new Error(`Error with storage: ${e}`);
    }
  }
}

const subscribersRepository = new SubscribersRepository();

module.exports = { subscribersRepository };
