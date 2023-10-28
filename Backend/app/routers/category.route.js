const express = require("express")
const category = require("../controller/category.controller")

const router = express.Router();

router.route("/")
    .get(category.findAll)
    .post(category.create)

router.route("/:id")
    .delete(category.delete)
    .patch(category.update)

module.exports = router;