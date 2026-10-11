const express = require("express");
const {validateNewUser, validateUser} = require("../validators/user_validators");
const {registerUser, loginUser} = require("../controllers/user_controller");
const router = express.Router();

router.post("/signup", validateUser, registerUser);

router.post("/login", validateNewUser, loginUser);

module.exports = router;