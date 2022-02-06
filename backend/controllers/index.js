const { subscribersRepository } = require('../repositories');

class SubscribersController {
  async getAll(_, res, next) {
    try {
      const subscribers = await subscribersRepository.getAll();
      res.json({
        status: 'success',
        code: 200,
        subscribers,
      });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const subscriber = await subscribersRepository.create({
        ...req.body,
      });

      res.status(201).json({
        status: 'success',
        code: 201,
        subscriber,
      });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    const { id } = req.params;
    try {
      const subscriber = await subscribersRepository.getById(id);
      if (!subscriber) {
        return next({
          status: 404,
          message: 'Subscriber not found',
        });
      }

      await subscribersRepository.remove(id);
      res.status(204).json({
        status: 'success',
        code: 204,
        message: 'Deleted successfully',
      });
    } catch (e) {
      next(e);
    }
  }
}

const subscribersController = new SubscribersController();

module.exports = { subscribersController };
