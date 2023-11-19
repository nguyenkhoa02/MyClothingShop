const express = require("express");
const users = require("../controller/user.controller");

const router = express.Router();

router.route("/:id")
    .patch(users.update)
    .delete(users.delete)



module.exports = router;