const express = require("express");
const router = express.Router();
const db = require("../util/db");
const teacher = require('./teacher');

router.use(teacher);


module.exports = router;
