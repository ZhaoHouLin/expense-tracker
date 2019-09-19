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
  const record = new Record({
    // userId: req.body.id,
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
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    return res.render("edit", { record: record });
  });
});
// 修改 Record
router.put("/:id", authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.name = req.body.name;
    category = req.body.category;
    date = req.body.date;
    amount = req.body.amount;
    record.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/records/${req.params.id}`);
    });
  });
});
// 刪除 Record
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
