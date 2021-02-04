const express = require("express");

const {
  registerController,
  getProfileController,
  profileUpdateController,
  loginController,
  logoutController,
  adminController,
} = require("../controllers/userControllers");

const authMiddleware = require("../middlewares/auth.middleware");

const adminMiddleware = require("../middlewares/admin.middleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/profile", authMiddleware, getProfileController);

router.put("/profile/update", authMiddleware, profileUpdateController);

router.get("/logout", authMiddleware, logoutController);

router.get("/admin", authMiddleware, adminMiddleware, adminController);

module.exports = router;
