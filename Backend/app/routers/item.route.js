const express = require("express");
const items = require("../controller/item.controller");

const router = express.Router();

router.route("/")
    .get(items.findAll)

router.route("/addItem")
    .post(items.create)

router.route("/:id")
    .get(items.findOne)
    .patch(items.update)
    .delete(items.delete)


router.route("/category/:category")
    .get(items.findItemCategory) // Get Items which is in This category


module.exports = router