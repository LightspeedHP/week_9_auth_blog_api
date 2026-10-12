const express = require("express");
const {validateNewUser, validateUser} = require("../validators/user_validators");
const {registerUser, loginUser} = require("../controllers/user_controller");
const router = express.Router();

router.post('/signup', validateNewUser, registerUser);

router.post('/login', validateUser, loginUser);

module.exports = router;