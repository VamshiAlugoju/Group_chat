const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

router.post("/signup",userControllers.SignUp);
router.post("/login",userControllers.Login);

module.exports = router