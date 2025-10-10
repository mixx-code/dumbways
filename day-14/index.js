import express from "express";
import session from "express-session";

import HomeRoute from "./routes/home.js"
import ProjectRoute from "./routes/project.js"
import ContactRoute from "./routes/contact.js"
import AuthRoute from "./routes/auth.js"


const app = express();
const port = 3000;

app.set("trust proxy", 1);
app.use(
  session({
    secret: "kucing",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: false }));

app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads"));

app.use(HomeRoute);
app.use(ProjectRoute);
app.use(ContactRoute);
app.use(AuthRoute);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

