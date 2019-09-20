const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth"); // 載入 auth middleware 裡的 authenticated 方法
const allFn = require("../public/javascripts/allFn");
const categories = require("../models/categories.json");
// 設定路由
// Record 首頁
router.get("/", authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort({ name: "asc" })
    .exec((err, records) => {
      const totalResult = allFn.totalAmount(records); //計算總支出
      console.log(records);
      const iconCategory = allFn.icon(records, categories);
      if (err) return console.error(err);
      return res.render("index", {
        records: records,
        totalResult,
        iconCategory
      });
    });
});

router.post("/", authenticated, (req, res) => {});

module.exports = router;
