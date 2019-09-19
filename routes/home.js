const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth"); // 載入 auth middleware 裡的 authenticated 方法

//計算總支出
function totalAmount(recordsData) {
  let result = 0
  recordsData.forEach(record => result += record.amount)
  return result
}


// 設定路由
// Record 首頁
router.get("/", authenticated, (req, res) => {
  Record.find({ userId: req.user._id })
    .sort({ name: "asc" })
    .exec((err, records) => {
      const totalResult = totalAmount(records)//計算總支出
      if (err) return console.error(err);
      return res.render("index", { records: records, totalResult });
    });
});






module.exports = router;
