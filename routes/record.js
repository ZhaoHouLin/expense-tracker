const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth"); // 載入 auth middleware
// 列出全部 Record
router.get("/", authenticated, (req, res) => {
  res.send("列出所有 Record");
});
// 新增一筆 Record 頁面
router.get("/new", authenticated, (req, res) => {
  return res.render("new");
});

// 新增一筆  Record
router.post("/", authenticated, (req, res) => {
  const record = Record({
    userId: req.user._id, // 儲存 userId
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  });
  record.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});
// 修改 Record 頁面
router.get("/:id/edit", authenticated, (req, res) => {
  // 要判斷是否為當前使用者的 Record
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      return res.render("edit", { record: record });
    }
  );
});
// 修改 Record
router.put("/:id", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.name = req.body.name;
      record.category = req.body.category;
      record.date = req.body.date;
      record.amount = req.body.amount;
      record.save(err => {
        if (err) return console.error(err);
        return res.redirect(`/`);
      });
    }
  );
});
// 刪除 Record
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.remove(err => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

module.exports = router;
