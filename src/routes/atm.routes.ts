import { Router } from "express"

/* Controllers */
import { createATMController, getAtmByUserController } from "../controllers/atm.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()



// /api/atm

// GET
router.get("/", verifyToken, getAtmByUserController)


// POST
router.post("/create/atm", verifyToken, createATMController)


export default router