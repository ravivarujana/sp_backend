import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = Router();

console.log("inside the router file");

router.route("/register").post(registerUser);

export default router;
