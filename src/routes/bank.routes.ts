import { Router } from "express"

/* Controllers */
import { createBankATMController, getBankByUserController } from "../controllers/bank.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()



// /api/bank

// GET
router.get("/amount", verifyToken, getBankByUserController)


// POST
router.post("/create/bank", verifyToken, createBankATMController)


export default router