const express = require("express");
const path = require("path");
const app = express();
const router = require("./router/appRouter.js");
const bodyParser = require('body-parser');
const ContactosController = require('./controllers/contactosController');

app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/",router);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cargarDatos', (req, res) => ContactosController.add(req, res));

app.listen(3000, ()=>{
    console.log("servidor escuchando",3000);
});