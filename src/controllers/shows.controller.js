const showService = require("../lib/showService");
const db = require("../lib/db");

async function index(req, res) {
  const shows = await showService.getShows();
  console.log("SHOWS:", shows);
  res.render("index", {
    title: "Sjónvarpsvefurinn",
    shows,
  });
}

async function show(req, res) {
  const id = req.params.id;

  console.log("Beðið um ID:", id);

  try {
    const tvShow = await showService.getShowById(id);

    if (!tvShow) {
      return res.status(404).render("404", {
        title: "Síða fannst ekki",
      });
    }
    let reviews = [];
    try {
      const reviewsResult = await db.query(
        `SELECT *
        FROM reviews
        WHERE show_id = $1
        ORDER BY created_at DESC`,
        [id],
      );
      reviews = reviewsResult.rows;
    } catch (reviewErr) {
      console.error("Gat ekki sótt umsagnir:", reviewErr.message);
    }

    console.log("Fann þátt:", tvShow);
    console.log("Fann review:", reviews);

    res.render("show-details", {
      title: tvShow.title,
      show: tvShow,
      reviews,
    });
  } catch (err) {
    console.error("Villa í show route:", err);
    res.status(500).render("error", {
      title: "Villa",
      message: "Gat ekki sótt þátt",
    });
  }
}

function createForm(req, res) {
  res.render("create", {
    title: "Bæta við þætti",
  });
}

async function createShow(req, res) {
  try {
    const { title, year, genre, seasons, image_url, description } = req.body;

    if (!title) {
      return res.status(400).send("Titill þáttar má ekki vera tómur!");
    }

    const newShow = await showService.insertShow({
      title,
      year,
      genre,
      seasons,
      image_url,
      description,
    });

    res.redirect(`/show/${newShow.id}`);
  } catch (err) {
    console.error("Villa að búa til þátt:", err);
    res
      .status(500)
      .send("ERROR 500 EN SAMT ER ÞETTA ÞÉR AÐ KENNA NOTANDI EKKI SERVER 😡");
  }
}

async function createReview(req, res) {
  const id = req.params.id;
  const { author, rating, comment } = req.body;

  try {
    await db.query(
      `INSERT INTO reviews (show_id, author, rating, comment)
       VALUES ($1, $2, $3, $4)`,
      [id, author, parseInt(rating, 10), comment],
    );
  } catch (err) {
    console.error(
      "Ekki alveg viss af hverju en þetta virkaði ekki 💔😢😢🤷‍♂️",
      err,
    );
  }

  res.redirect(`/show/${id}`);
}

async function removeForm(req, res) {
  const shows = await showService.getShows();
  res.render("remove", {
    title: "Fjarlægja þátt",
    shows,
  });
}

async function removeShow(req, res) {
  const { id } = req.body;

  try {
    if (id) {
      await showService.deleteShow(id);
    }
    res.redirect("/remove");
  } catch (err) {
    console.error("Gat ekki fjarlægt þátt:", err);
    res.status(500).send("Villa við að eyða þættinum úr gagnagrunninum.");
  }
}

module.exports = {
  index,
  show,
  createForm,
  createShow,
  createReview,
  removeForm,
  removeShow,
};
