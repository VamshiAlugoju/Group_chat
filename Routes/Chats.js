const {Router} = require("express");
const routes = Router();
const ChatControllelrs = require("../controllers/ChatControllers");
const Authenticate = require("../middleware/Authenticate");
const multer = require("multer");

const upload = multer();

routes.post("/:id", upload.single("file"),Authenticate.Authenticate, ChatControllelrs.PostMessage);
routes.get("/:id",Authenticate.Authenticate,ChatControllelrs.getMessages);

module.exports = routes;