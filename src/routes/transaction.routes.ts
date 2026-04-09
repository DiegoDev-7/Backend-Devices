import { Router } from "express"

/* Controller */
import { sendBankToATMController, sendATMToBankController, sendATMToUserController, getTransactionController } from "../controllers/transaction.controller.js"

/* Middleware */
import { verifyToken } from "../middlewares/auth.middleware.js"


const router = Router()



// /api/transaction

// GET
/* 

  /api/transaction/history?page=1&limit=10&type=atm_transfer
  _________________________________________
  | parameter | description               |
  | --------- | ------------------------- |
  | "page"    | Number page               |
  | "limit"   | Transaction quantity      |
  | "type"    | Type filter               |
  |_______________________________________|

*/
router.get("/history", verifyToken, getTransactionController)


// POST
router.post("/bank", verifyToken, sendBankToATMController)

router.post("/atm", verifyToken, sendATMToBankController)

router.post("/user", verifyToken, sendATMToUserController)


export default router