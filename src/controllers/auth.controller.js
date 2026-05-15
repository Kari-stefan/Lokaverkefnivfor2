const userService = require("../lib/userService");

function getLogin(req, res) {
  res.render("login", { title: "Innskráning" });
}
//
async function postLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByUsername(username);

    if (user && user.password === password) {
      res.setHeader("Set-Cookie", `userId=${user.id}; Path=/; HttpOnly`);
      return res.redirect("/");
    }

    res.status(401).send("Rangt notandanafn eða lykilorð");
  } catch (err) {
    console.error(err);
    res.status(500).send("Villa við innskráningu");
  }
}

function getRegister(req, res) {
  res.render("register", { title: "Nýskráning" });
}

async function postRegister(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userService.createUser(username, password);

    res.setHeader("Set-Cookie", `userId=${user.id}; Path=/; HttpOnly`);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Villa við nýskráningu (Líklega notandanafn frátekið)");
  }
}

function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    "userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
  );
  res.redirect("/");
}

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
};
