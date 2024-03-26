const express = require('express')
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const { getContact, getContactById, createContact, updateContact, deleteContact } = require("../controllers/contactController")

router.use(validateToken) //make all the routes private under validataToken

router.route("/").get(getContact)

router.route("/:id").get(getContactById)

router.route("/").post(createContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

module.exports = router;

