const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");
const { generateToken } = require("../utils/jwtUtils.js");

class AuthService {
  async login(nombre, contraseña) {
    try {
      // Buscar el usuario por nombre
      const existingUser = await userModel.findUserByNombre(nombre);
      if (!existingUser) {
        throw new Error("User does not exist");
      }

      // Comparar la contraseña
      const isPasswordValid = await bcrypt.compare(
        contraseña,
        existingUser.contraseña,
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Generar un token JWT
      const token = generateToken(existingUser);
      return token;
    } catch (error) {
      if (
        error.message === "User does not exist" ||
        error.message === "Invalid password"
      ) {
        throw new Error("Invalid credentials");
      }
      throw new Error("An error occurred during the login process");
    }
  }
}

// Exportar la clase
module.exports = new AuthService();
