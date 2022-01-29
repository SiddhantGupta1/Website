const { Router } = require("express");
const router = Router();
const { signup, login, logout } = require("../controllers/authController");
const { requireAuth, checkUser } = require("../middlewares/authMiddleware");

router.post("/users/signup", signup);
router.post("/users/login", login);
router.post("/users/me/logout", requireAuth, logout);

module.exports = router;
