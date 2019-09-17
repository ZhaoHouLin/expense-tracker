const mongoose = require("mongoose");
const Record = require("../record");

mongoose.connect("mongodb://localhost/record", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");
  Record.create({
    name: "捷運",
    category: "交通",
    date: "2019 / 09 / 17 ",
    amount: 1000
  });
  console.log("done");
});
