const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  res.render("index", { record: record });
});

// 設定路由
// Record 首頁
router.get("/", (req, res) => {
  res.send("hello world!");
});

module.exports = router;
