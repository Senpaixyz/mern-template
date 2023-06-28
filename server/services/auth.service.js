const User = require("../models/UsersSchema");
const cacheUtil = require('../utils/cache.utils');

exports.createUser = (user) => {
  return User.create(user);
}

exports.findUserByEmail = (email) => {
  return User.findOne({ email: email })
}

exports.findUserById = (id) => {
  return User.findById(id);
}

exports.logoutUser = (token, exp) => {
  const now = new Date();
  const expire = new Date(exp * 1000);
  const milliseconds = expire.getTime() - now.getTime();
  /* ----------------------------- BlackList Token ---------------------------- */
  return cacheUtil.set(token, token, milliseconds);
}