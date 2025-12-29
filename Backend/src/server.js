require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const articleRoutes = require("./routes/article.routes");

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api/articles", articleRoutes);

/* Database Connection */
connectDB();

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
