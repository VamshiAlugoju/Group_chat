const express = require("express");
const router = express.Router();
const groupControllers = require("../controllers/GroupControllers");

router.get("/get_users",groupControllers.get_group_users);

router.post("/add_to_group",groupControllers.add_to_group)

router.get("/:id",groupControllers.getGroupdetails);


module.exports = router;