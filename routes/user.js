const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport"); // 載入 passport
const bcrypt = require("bcryptjs");
// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入檢查
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    // 使用 passport 認證
    successRedirect: "/", // 登入成功會回到根目錄
    failureRedirect: "/users/login" // 失敗會留在登入頁面
  })(req, res, next);
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊檢查
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors, name, email, password, password2
    })
  } else {
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

        // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
        bcrypt.genSalt(10, (err, salt) =>
          // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            // 用 bcrypt 處理密碼後，再把它儲存起來
            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }

});

// 登出
router.get("/logout", (req, res) => {
  req.logout();
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
});

module.exports = router;
