const express = require("express");
const router = express.Router();
const Record = require("../models/record");

// 設定路由
// Record 首頁
router.get("/", (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err);
    return res.render("index", { records: records });
  });
});

module.exports = router;
