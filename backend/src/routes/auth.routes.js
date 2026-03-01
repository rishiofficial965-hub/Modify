const { Router } = require("express");
const handler = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = Router();

router.post("/register", handler.registerUser);
router.post("/login",  handler.loginUser);
router.get("/get-me", authMiddleware.authUser, handler.getMe);
router.get("/logout",  handler.logoutUser);

module.exports = router;
