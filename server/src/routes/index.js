const express = require("express");
const router = express.Router();
const db = require("../util/db");
const teacher = require('./teacher');
const subject = require('./subject');

router.use(teacher);
router.use(subject);


module.exports = router;
