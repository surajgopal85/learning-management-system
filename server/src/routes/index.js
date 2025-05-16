const express = require("express");
const router = express.Router();
const db = require("../util/db");
const teacher = require('./teacher');
const subject = require('./subject');
const student = require('./student');
const course = require('./course');
const assignment = require('./assignment');
const assignment_category = require('./assignment_category');
const grade = require('./grade');

router.use(teacher);
router.use(subject);
router.use(student);
router.use(course);
router.use(assignment);
router.use(assignment_category);
router.use(grade);

module.exports = router;
