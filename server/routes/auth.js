import express from "express";
import { login } from "../controllers/auth.js"; // controller not created until now

const router = express.Router(); // allows express to identify that the routes will all be configured and allows them to be present in separate files.

router.post("/login", login);



export default router;