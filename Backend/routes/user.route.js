import express from "express";
import {
  signup,
  login,
  logout,
  allUsers,
  updateAvatar,
  deleteAvatar,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.put("/avatar", secureRoute, updateAvatar);
router.delete("/avatar", secureRoute, deleteAvatar);

export default router;
