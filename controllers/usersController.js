const userService = require("../services/signup.js");
const bcrypt = require("bcrypt");

class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      userData.contraseña = await bcrypt.hash(userData.contraseña, 10);
      const user = await userService.createUser(userData);
      res.redirect("/");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
