const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  res.render("index", { record: record });
});

module.exports = router;
