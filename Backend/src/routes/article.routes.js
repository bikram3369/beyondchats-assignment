const express = require("express");
const router = express.Router();
const controller = require("../controllers/article.controller");


router.post("/scrape", controller.scrapeAndSave); // raw scraping
router.get("/", controller.getAllArticles);


module.exports = router;
