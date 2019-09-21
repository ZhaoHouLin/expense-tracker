const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth"); // 載入 auth middleware 裡的 authenticated 方法
const allFn = require("../public/javascripts/allFn");
const categories = require("../models/categories.json").categories;
// 設定路由
// Record 首頁
router.get("/", authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort({ name: "asc" })
    .exec((err, records) => {
      const totalResult = allFn.totalAmount(records); //計算總支出
      // const iconCategories = allFn.iconCategory(records, categories);
      records.forEach(record => {
        record.icon = categories[record.category].icon;
      });

      if (err) return console.error(err);
      return res.render("index", {
        records,
        totalResult
      });
    });
});

router.post("/", authenticated, (req, res) => {});

module.exports = router;
