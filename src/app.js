import express from "express";
import router  from './routes/index.js';
import {connectbdd} from './config/mongoDb.config.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

connectbdd();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/ecommerce",
      ttl: 15,
    }),
    secret: "CodigoSecreto",
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport();
app.use("/api", router);
app.listen(8080, () => {
  console.log("Escuchando el servidor en el puerto 8080");
});
