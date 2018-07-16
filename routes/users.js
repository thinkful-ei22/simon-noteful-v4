'use strict';

const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { fullname, username, password } = req.body;

  if (!username) {
    const err = new Error('Missing `username` in request body');
    err.status = 400;
    return next(err);
  }
  if (!password) {
    const err = new Error('Missing `password` in request body');
    err.status = 400;
    return next(err);
  }

  const newUser = { fullname, username, password };

  User.create(newUser)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;