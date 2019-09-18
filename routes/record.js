const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  res.send("列出所有Record");
});

// 列出全部 Record
router.get("/", (req, res) => {
  res.send("列出所有 Record");
});
// 新增一筆 Record 頁面
router.get("/new", (req, res) => {
  return res.render("new");
});
// 顯示一筆 Record 的詳細內容
router.get("/:id", (req, res) => {
  res.send("顯示 Record 的詳細內容");
});
// 新增一筆  Record
router.post("/", (req, res) => {
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
router.get("/:id/edit", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    return res.render("edit", { record: record });
  });
});
// 修改 Record
router.post("/:id/edit", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.name = req.body.name;
    category = req.body.category;
    date = req.body.date;
    amount = req.body.amount;
    record.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/`);
    });
  });
});
// 刪除 Record
router.post("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
