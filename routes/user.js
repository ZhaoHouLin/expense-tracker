const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport"); // 載入 passport

// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入檢查
router.post("/login", (req, res) => {
  passport.authenticate("local", {
    // 使用 passport 認證
    successRedirect: "/", // 登入成功會回到根目錄
    failureRedirect: "/user/login" // 失敗會留在登入頁面
  })(req, res, next);
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊檢查
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      // 如果 email 已經存在的話，將不能送出，並回到註冊表單頁面
      console.log("User already exists");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      // 如果 email 不存在就新增使用者
      const newUser = new User({
        name,
        email,
        password
      });
      // 新增完成後導回首頁
      newUser
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
    }
  });
});

// 登出
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
