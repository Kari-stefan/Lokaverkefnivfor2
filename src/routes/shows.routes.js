const express = require("express");
const router = express.Router();

const showsController = require("../controllers/shows.controller");

function requireAuth(req, res, next) {
  next();
}

router.get("/", showsController.index);

router.get("/create", requireAuth, showsController.createForm);
router.post("/create", requireAuth, showsController.createShow);

router.get("/show/:id", showsController.show);

router.post("/show/:id/review", showsController.createReview);

router.get("/remove", requireAuth, showsController.removeForm);
router.post("/remove", requireAuth, showsController.removeShow);

module.exports = router;
