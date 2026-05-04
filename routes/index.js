const router = require("express").Router();
const apiRoutes = require("./api");

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;