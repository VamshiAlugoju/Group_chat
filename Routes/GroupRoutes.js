const express = require("express");
const router = express.Router();
const groupControllers = require("../controllers/GroupControllers");

router.get("/get_users",groupControllers.get_group_users);

router.post("/add_to_group",groupControllers.add_to_group)

router.delete("/delete_user",groupControllers.delete_user);

router.get("/:id",groupControllers.getGroupdetails);

router.post("/makeAdmin",groupControllers.makeAdmin)

module.exports = router;