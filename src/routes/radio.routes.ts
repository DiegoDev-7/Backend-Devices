import { Router } from "express"

/* Controller */
import { getRadioColombiaController, getRadioEEUUController, getRadioJapanController } from "../controllers/radio.controller.js"

const router = Router()



// /api/radio

// GET
router.get("/colombia", getRadioColombiaController)

// GET
router.get("/eeuu", getRadioEEUUController)

// GET
router.get("/japan", getRadioJapanController)


export default router