const express = require("express");
const router = express.Router();
const db = require("../util/db");
const teacher = require('./teacher');
const subject = require('./subject');
const student = require('./student');

router.use(teacher);
router.use(subject);
router.use(student);


module.exports = router;
