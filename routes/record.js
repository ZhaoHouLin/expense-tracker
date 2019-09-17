const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  res.send("列出所有Record");
});

// router.get("/new", (req, res) => {
//   console.log("I am in GET /new");
//   return res.render("new");
// });

// router.post("/", (req, res) => {
//   const record = Record({
//     name: req.body.name
//     // 儲存 userId
//     // userId: req.user._id
//   });
//   record.save(err => {
//     if (err) return console.error(err);
//     return res.redirect("/");
//   });
// });

// 列出全部 Record
router.get("/", (req, res) => {
  res.send("列出所有 Record");
});
// 新增一筆 Record 頁面
router.get("/new", (req, res) => {
  res.send("新增 Record 頁面");
});
// 顯示一筆 Record 的詳細內容
router.get("/:id", (req, res) => {
  res.send("顯示 Record 的詳細內容");
});
// 新增一筆  Record
router.post("/", (req, res) => {
  res.send("建立 Record");
});
// 修改 Record 頁面
router.get("/:id/edit", (req, res) => {
  res.send("修改 Record 頁面");
});
// 修改 Record
router.post("/:id/edit", (req, res) => {
  res.send("修改 Record");
});
// 刪除 Record
router.post("/:id/delete", (req, res) => {
  res.send("刪除 Record");
});

module.exports = router;
