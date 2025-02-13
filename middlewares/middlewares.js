const session = require("express-session");

const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.usuarios && req.session.usuarios.name === "pedro") {
    next();
  } else {
    res.status(403).render("error", {
      message: "Acceso denegado: solo para administradores",
    });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
