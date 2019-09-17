const express = require("express");
const app = express();
const port = 3001;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
