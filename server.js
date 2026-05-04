const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});
