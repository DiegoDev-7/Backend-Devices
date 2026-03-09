import { Router } from "express"

/* Controllers */
import { claimRewardController, clickRewardController } from "../controllers/game.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()



// /api/game

// POST
router.post("/click", verifyToken, clickRewardController)

router.post("/claim", verifyToken, claimRewardController)


export default router