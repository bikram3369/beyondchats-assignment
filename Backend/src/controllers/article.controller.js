const Article = require("../models/Article");
const scrapeBlog = require("../services/scraper.service");

// POST /api/articles/scrape  → Phase 1
exports.scrapeAndSave = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const data = await scrapeBlog(url);
    const article = await Article.create(data);

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};