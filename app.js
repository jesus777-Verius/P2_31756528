const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const router = require("./router/appRouter.js");
const Router = require("./router/userRouter.js");
const { isAuthenticated, isAdmin } = require("./middlewares/middlewares.js");
const bodyParser = require("body-parser");
const ContactosController = require("./controllers/contactosController");

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "tu_clave_secreta",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use("/", router);
app.use("/user", Router);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", isAuthenticated, isAdmin, (req, res) => {
  res.render("signup");
});

app.get("/contacts", isAuthenticated, async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/cargarDatos");
    const contactos = await response.json();
    res.render("contacts", { contactos: contactos });
  } catch (error) {
    console.error("Error fetching contactos:", error);
    res.status(500).send("Error fetching contactos");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/cargarDatos", (req, res) => ContactosController.add(req, res));

app.listen(3000, () => {
  console.log("servidor escuchando", 3000);
});
