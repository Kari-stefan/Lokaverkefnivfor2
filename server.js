require("dotenv").config();
const express = require("express");
const path = require("path");

const showsRouter = require("./src/routes/shows.routes");
const authRouter = require("./src/routes/auth.routes");
const userService = require("./src/lib/userService");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  res.locals.user = null;
  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    const match = cookieHeader.match(/userId=(\d+)/);
    if (match) {
      const userId = parseInt(match[1], 10);
      try {
        const user = await userService.getUserById(userId);
        if (user) {
          req.user = user;
          res.locals.user = user;
        }
      } catch (err) {
        console.error("Villa við að sækja notanda úr cookie:", err);
      }
    }
  }
  next();
});

app.use("/", authRouter);
app.use("/", showsRouter);

app.get("/about", (req, res) => {
  res.render("about", { title: "Um okkur" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Innskráning" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Eitthvað fór úrskeiðis!");
});

app.listen(PORT, () => {
  console.log(`Server keyrir á http://localhost:${PORT}`);
});

console.log("Ef þú skoðar css mun það lýta smá skrítið út, vildi lata siðunna lita vel út og kunnti ekki nokkra hluti/koða í css þannig notaði ai fyrir hjalp með að gera cssið(tæknilega scss) en ja");
