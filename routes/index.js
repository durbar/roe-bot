const express = require('express');
const router = express.Router();
const bot = require("../utils/bot");
const mysql = require("mysql");


router.get('/ping', async function(req, res, next) {
  return res.send("pong");
});

module.exports = router;
