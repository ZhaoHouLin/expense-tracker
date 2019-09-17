const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  res.send("列出所有Record");
});

router.get("/new", (req, res) => {
  console.log("I am in GET /new");
  return res.render("new");
});

router.post("/", (req, res) => {
  const record = Record({
    name: req.body.name
    // 儲存 userId
    // userId: req.user._id
  });
  record.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

module.exports = router;
