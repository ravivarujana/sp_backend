import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

console.log("inside the router file");

/* Using multer middleware for handling the files - here image for avatar and coverImage  */

/* This middeware will allow us to access the files on the request */

/* Allowing user to only enter max 1 image for each field */
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;
