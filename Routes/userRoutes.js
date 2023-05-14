const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = new multer();

const userControllers = require("../controllers/userControllers");
const Authenticate = require("../middleware/Authenticate");

router.post("/signup",userControllers.SignUp);
router.post("/login",userControllers.Login);
router.get("/groups", Authenticate.Authenticate, userControllers.getGroups)
router.post("/groups", upload.single("file"),Authenticate.Authenticate,userControllers.createGroup);

module.exports = router