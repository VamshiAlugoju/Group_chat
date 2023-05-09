const {Router} = require("express");
const routes = Router();
const ChatControllelrs = require("../controllers/ChatControllers");
const Authenticate = require("../middleware/Authenticate");

routes.post("/:id",Authenticate.Authenticate, ChatControllelrs.PostMessage);
routes.get("/:id",Authenticate.Authenticate,ChatControllelrs.getMessages);

module.exports = routes;