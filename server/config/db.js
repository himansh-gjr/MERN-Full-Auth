const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://localhost/fullAuth", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("Could not connect to mongo db", err));
}

module.exports = connectDB;
