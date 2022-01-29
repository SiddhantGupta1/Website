const { Router } = require("express");
const router = Router();
const {
  readUsers,
  getUserMe,
  updateUserMe,
  deleteUserMe,
} = require("../controllers/userController");
const { requireAuth, checkUser } = require("../middlewares/authMiddleware");

router.post("/users", readUsers);
router.get("/users/me", getUserMe);
router.patch("/users/me", updateUserMe);
router.delete("/users/me", deleteUserMe);

module.exports = router;
