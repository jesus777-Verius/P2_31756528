const userModel = require("../models/userModel.js");

const createUser = async (userData) => {
  try {
    const user = await userModel.createUser(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
