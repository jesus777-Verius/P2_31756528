const { findUserByNombre } = require("../models/userModel.js");
const { isAuthenticated } = require("../middlewares/middlewares.js");
const bcrypt = require("bcrypt");

class AuthController {
  async authLogin(req, res) {
    try {
      const { nombre, contraseña } = req.body;

      if (!nombre || !contraseña) {
        return res
          .status(400)
          .json({ message: "Nombre and contraseña are required" });
      }

      const user = await findUserByNombre(nombre);

      if (!user) {
        console.log("User not found:", nombre);
        return res.redirect("/login");
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);

      if (!isMatch) {
        console.log("Password mismatch for user:", nombre);
        return res.redirect("/login");
      }

      req.session.isAuthenticated = true;
      console.log("User authenticated:", nombre);
      res.redirect("/contacts");
    } catch (error) {
      console.error("Error during login:", error);
      res.redirect("/contacts");
    }
  }
}

module.exports = new AuthController();
