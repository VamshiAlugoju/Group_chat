const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const Authenticate = require("../middleware/Authenticate");

router.post("/signup",userControllers.SignUp);
router.post("/login",userControllers.Login);
router.get("/groups", Authenticate.Authenticate, userControllers.getGroups)
router.post("/groups",Authenticate.Authenticate,userControllers.createGroup);

module.exports = router