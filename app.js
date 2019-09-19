const express = require("express");
const app = express();
const port = 3001;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/record", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 載入 Passport config
require("./config/passport")(passport);
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated(); // 辨識使用者是否已經登入的變數，讓 view 可以使用
  next();
});

app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));
app.use("/users", require("./routes/user"));
// app.use("/auth",require("./routes/"))
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
