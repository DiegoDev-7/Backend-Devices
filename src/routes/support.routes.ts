import { Router } from "express"

/* Controllers */
import { sendSupportEmailController } from "../controllers/support.controller.js"


const router = Router()



// /api/support

// POST
router.post("/", sendSupportEmailController)


export default router