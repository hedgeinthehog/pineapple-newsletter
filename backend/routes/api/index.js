const express = require('express');
const router = express.Router();
const { subscribersController: ctrl } = require('../../controllers');
const { validateCreateSubscriber } = require('../../validation/subscribers');

router
  .get('/', ctrl.getAll)
  .post('/', validateCreateSubscriber, ctrl.create)
  .delete('/:id', ctrl.remove);

module.exports = { router };
