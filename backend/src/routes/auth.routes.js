const { Router } = require("express");
const handler = require("../controllers/auth.controller");
const router = Router();

router.post("/register", handler.registerUser);
router.post("/login", handler.loginUser);

module.exports = router;
