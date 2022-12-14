const mongoose = require("mongoose");
//Connecting mongoose to mongodb

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network2",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);
module.exports = mongoose.connection;
