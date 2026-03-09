import { Router } from "express"

/* Controllers */
import { registerController, loginController, googleLoginController, googleRegisterController, googleDeleteController } from "../controllers/auth.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = Router()



// /api/auth

// POST
router.post("/register", registerController)

router.post("/login", loginController)

router.post("/google/register", googleRegisterController)

router.post("/google/login", googleLoginController)


// DELETE
router.delete("/google/delete-account", verifyToken, googleDeleteController)


export default router