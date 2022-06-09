const express = require("express");
const router = express.Router();

const {eventRouter} = require("./event-router");
const {personRouter} = require("./person-router");
const {loginRouter} = require("./login-router");
const {signupRouter} = require("./signup-router");
const {planningRouter} = require("./planning-router")

router.use("/event", eventRouter);
router.use("/person", personRouter);
router.use("/login", loginRouter);
router.use("/signup",signupRouter);
router.use("/planning",planningRouter);

module.exports = router;