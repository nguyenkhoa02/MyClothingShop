const express = require("express");
const users = require("../controller/user.controller");

const router = express.Router();

router.route("/signin")
    .post(users.validate);

router.route("/signup")
    .post(users.create)

router.route("/:id")
    .patch(users.update)
    .delete(users.delete)

module.exports = router;