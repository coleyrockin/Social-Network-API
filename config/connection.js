const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-api";

mongoose.set("sanitizeFilter", true);
mongoose.set(
  "debug",
  process.env.NODE_ENV === "development" && process.env.MONGOOSE_DEBUG === "true"
);

mongoose.connect(connectionString);

mongoose.connection.on("error", error => {
  console.error("MongoDB connection error:", error.message);
});

module.exports = mongoose.connection;
